import crypto = require('crypto');
import sendToWormhole = require('stream-wormhole');
import { Controller } from 'egg';
import {
  defaultRes,
  getFileName,
  passwordSecret,
} from '../utils';
import { Response } from '../utils/interface';
import { loginRule, registerRule } from '../utils/validateRules';

export default class UserController extends Controller {
  public async login() {
    const { ctx } = this;
    ctx.validate(loginRule);

    let response: Response;
    const {
      userName: name,
      password,
      mobile,
      captcha,
      type,
    } = ctx.request.body;

    // mock captcha === '1234'
    if (type === 'mobile' && captcha !== '1234') {
      response = {
        ...defaultRes,
        data: { type },
        msg: '验证码错误',
      };
      ctx.body = response;
      ctx.status = 200;

      return;
    }

    let params;
    // 多种登录方式
    switch (type) {
      case 'mobile':
        params = { mobile };
        break;
      case 'taobao':
        break;
      case 'weibo':
        break;
      case 'qq':
        break;
      case 'weixin':
        break;
      default:
        const pwd = crypto
          .createHmac('sha256', passwordSecret)
          .update(password)
          .digest('hex');
        params = { name, pwd };
    }
    const user = (await ctx.model.User.find(params))[0];

    if (user) {
      if (+user.status) {
        response = {
          success: true,
          data: { type, currentAuthority: user.role },
        };
        ctx.session.user = user;
      } else {
        response = {
          ...defaultRes,
          data: {},
          msg: '该用户已被禁用，请联系系统管理员',
        };
      }
    } else {
      response = {
        ...defaultRes,
        data: { type },
        msg: type === 'account' ? '用户不存在或密码错误' : '用户不存在',
      };
    }

    ctx.body = response;
    ctx.status = 200;
  }

  public async list() {
    const { ctx } = this;
    const {
      current = 1,
      pageSize = 10,
      name,
      mobile,
      status,
      // sorter,
      // sorterOrder,
    } = ctx.query;
    const skip = (+current - 1) * +pageSize;

    const query = {
      name: { $regex: name },
      mobile: { $regex: mobile },
      status: { $in: [status] },
      // age: { $gt: 17, $lt: 66 },
    };

    Object.keys(query).map(key => {
      if (ctx.query[key] === undefined) {
        delete query[key];
      }
    });

    const res = await this.ctx.model.User.find(query, { pwd: 0, by: 0 })
      .skip(skip).limit(Number(pageSize))
      .sort({ createdAt: -1 }).exec();
    const total = await this.ctx.model.User.count(query).exec();

    const response = {
      ...defaultRes,
      success: true,
      data: { list: res, pagination: { current, pageSize, total } },
    };

    ctx.body = response;
    ctx.status = 200;
  }

  public async logout() {
    const { ctx } = this;
    ctx.session.user = null;
    const response = {
      ...defaultRes,
      success: true,
    };

    ctx.body = response;
    ctx.status = 200;
  }

  public async register() {
    const { ctx, service } = this;
    const { body } = ctx.request;
    const { password, captcha } = body;
    // 校验参数
    ctx.validate(registerRule);

    let response: Response;
    // 通用的模拟验证码为1234
    if (captcha !== '1234' && captcha !== ctx.session.userVerifyCode) {
      response = {
        success: false,
        msg: '验证码错误',
      };
      ctx.body = response;
      ctx.status = 200;

      return;
    }

    body.pwd = crypto
      .createHmac('sha256', passwordSecret)
      .update(password)
      .digest('hex');

    const { error } = await service.user.register(body);

    response = {
      success: !error,
    };

    ctx.body = response;
    ctx.status = 200;
  }

  public async update() {
    const { ctx } = this;
    const { body } = ctx.request;
    const { _id } = body;
    let response: Response;

    const user = await ctx.model.User.findByIdAndUpdate(_id, body, { new: true });

    if (!user) {
      response = {
        success: false,
        msg: '该用户不存在',
      };
    } else {
      ctx.session.user = user;
      response = {
        success: true,
      };
    }

    ctx.body = response;
    ctx.status = 200;
  }

  public async updateUsers() {
    const { ctx } = this;
    const { body } = ctx.request;
    const { ids } = body;
    let response: Response;

    const idList = ids.split(',') || [];

    const res = await Promise.all(idList.map(async _id => {
      await ctx.model.User.findByIdAndUpdate(_id, body, { new: true });
    }));

    response = {
      success: res ? true : false,
    };

    ctx.body = response;
    ctx.status = 200;
  }

  public info() {
    const { ctx } = this;

    const res: Response = {
      success: true,
      data: ctx.session.user,
    };

    ctx.body = res;
    ctx.status = 200;
  }

  public async upload() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const name = getFileName(stream.filename);
    let result;
    const failRes = {
      success: false,
      msg: '上传失败',
      code: 'upload failed',
      data: null,
    };

    try {
      result = await ctx.oss.put(name, stream);
    } catch (err) {
      await sendToWormhole(stream);

      throw err;
    }

    if (result) {
      const { _id } = stream.fields;
      const { url } = result;
      const params = {
        avatar: url,
      };
      const user = await ctx.model.User.findByIdAndUpdate(_id, params, { new: true });
      if (user) {
        ctx.session.user = user;
        ctx.body = {
          success: true,
          msg: '上传成功',
          code: 'upload success',
          data: user,
        };
      } else {
        ctx.body = failRes;
      }
    } else {
      ctx.body = failRes;
    }
  }

  /**
   * 修改安全设置
   */
  public async updateSecurity() {
    const { ctx } = this;
    const { body } = ctx.request;
    const { type } = body;
    let response: Response;
    let user = ctx.session.user;
    const { _id } = user;

    switch (type) {
      case 'pwd': // 更改密码
        const { oldPassword, password } = body;
        const pwd = crypto
          .createHmac('sha256', passwordSecret)
          .update(oldPassword)
          .digest('hex');

        if (user.pwd !== pwd) {
          response = {
            success: false,
            msg: '请输入正确的旧密码',
          };

          ctx.body = response;
          ctx.status = 200;
          return;
        } else {
          user.pwd = crypto
            .createHmac('sha256', passwordSecret)
            .update(password)
            .digest('hex');
        }
        break;
      case 'mobild': // 更改绑定的手机
        break;
      default:
    }

    user = await ctx.model.User.findByIdAndUpdate(_id, user, { new: true });

    if (!user) {
      response = {
        success: false,
        msg: '该用户不存在',
      };
    } else {
      ctx.session.user = user;
      response = {
        success: true,
      };
    }

    ctx.body = response;
    ctx.status = 200;
  }

}
