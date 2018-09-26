import crypto = require('crypto');
import { Controller } from 'egg';
import { currentUser } from '../../mock/user';
import {
  defaultRes,
  passwordSecret,
  Response,
} from '../utils';
import { registerRule } from '../utils/validateRules';

export default class UserController extends Controller {
  public async login() {
    const { ctx } = this;
    let response: Response;

    const {
      userName: name,
      password: pwd,
      mobile: phone,
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
        params = { phone };
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
        // 密码加密
        // const password = crypto
        //   .createHmac('sha256', passwordSecret)
        //   .update(unEncrypted)
        //   .digest('hex');
        params = { name, pwd };
    }

    const user = (await ctx.model.User.find(params))[0];

    if (user) {
      response = {
        success: true,
        data: { type, currentAuthority: user.role },
      };
      ctx.session.user = user;
    } else {
      response = {
        ...defaultRes,
        data: { type },
        msg: '用户不存在或密码错误',
      };
    }

    ctx.body = response;
    ctx.status = 200;
  }

  public async list() {
    const { ctx } = this;
    const list = await ctx.model.User.find();

    const response = {
      ...defaultRes,
      success: true,
      data: { list },
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
    const { password: unEncrypted } = body;
    // 校验参数
    ctx.validate(registerRule);

    const password = crypto
      .createHmac('sha256', passwordSecret)
      .update(unEncrypted)
      .digest('hex');
    body.password = password;

    const result = await service.user.register('user', body);

    ctx.body = result;
    ctx.status = 200;
  }

  public info() {
    const { ctx } = this;

    ctx.session.user = currentUser;

    ctx.body = this.ctx.session.user;
    ctx.status = 200;
  }

}
