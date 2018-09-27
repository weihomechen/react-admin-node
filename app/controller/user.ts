import crypto = require('crypto');
import { Controller } from 'egg';
import { currentUser } from '../../mock/user';
import {
  defaultRes,
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
      response = {
        success: true,
        data: { type, currentAuthority: user.role },
      };
      ctx.session.user = user;
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
    const { password, captcha } = body;
    // 校验参数
    ctx.validate(registerRule);

    let response: Response;
    // mock captcha === '1234'
    if (captcha !== '1234') {
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

  public info() {
    const { ctx } = this;

    ctx.session.user = currentUser;

    const res: Response = {
      success: true,
      data: ctx.session.user,
    };

    ctx.body = res;
    ctx.status = 200;
  }

}
