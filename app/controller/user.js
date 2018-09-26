const crypto = require('crypto');
const { Controller } = require('egg');
const { currentUser } = require('../../mock/user');
const {
  passwordSecret,
  defaultRes,
} = require('../utils');

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    let response = {};

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
        type,
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
        type,
        currentAuthority: user.role,
      };
      ctx.session.user = user;
    } else {
      response = {
        ...defaultRes,
        type,
        msg: '用户不存在或密码错误',
      };
    }

    ctx.body = response;
    ctx.status = 200;
  }

  async list() {
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

  async logout() {
    const { ctx } = this;
    ctx.session.user = null;
    const response = {
      ...defaultRes,
      success: true,
    };

    ctx.body = response;
    ctx.status = 200;
  }

  async register() {
    const { ctx, service } = this;
    const { body } = ctx.request;
    const { password: unEncrypted } = body;
    const rule = {
      name: { type: 'string' },
      mobile: { type: 'string' },
      password: { type: 'string' },
      prefix: { type: 'string' },
    };

    // 校验参数
    ctx.validate(rule);

    const password = crypto
      .createHmac('sha256', passwordSecret)
      .update(unEncrypted)
      .digest('hex');
    body.password = password;

    const result = await service.user.register('user', body);

    ctx.body = result;
    ctx.status = 200;
  }

  info() {
    const { ctx } = this;

    ctx.session.user = currentUser;

    ctx.body = this.ctx.session.user;
    ctx.status = 200;
  }

}

module.exports = UserController;
