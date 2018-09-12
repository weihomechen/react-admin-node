// const crypto = require('crypto');
const { Controller } = require('egg');
const {
  // passwordSecret,
  defaultRes,
} = require('../utils');

class UserController extends Controller {
  async login() {
    const { ctx, service } = this;
    // const { name, password: unEncrypted } = ctx.request.body;
    const { name, pwd } = ctx.request.body;
    let response = {};

    const result = await ctx.model.User.find({ name, pwd });

    // const password = crypto
    //   .createHmac('sha256', passwordSecret)
    //   .update(unEncrypted)
    //   .digest('hex');

    // if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(name)) {
    //   result = await service.user.login({ email: name, password });
    //   if (!result.success) {
    //     result = await service.user.login({ name, password });
    //   }
    // } else {
    //   result = await service.user.login({ name, password });
    // }

    const user = result[0];

    if (user) {
      response = {
        ...defaultRes,
        success: true,
        msg: '登录成功',
      };
      ctx.session.user = user;
    } else {
      response = {
        ...defaultRes,
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

  info() {
    this.ctx.body = {
      success: true,
      msg: '',
      code: '',
      data: this.ctx.session.user,
    };

    this.ctx.status = 200;
  }

}

module.exports = UserController;
