const Controller = require('egg').Controller;
const { list } = require('../../mock/menu');
const { defaultRes } = require('../utils');

class MenuController extends Controller {
  async list() {
    const { ctx } = this;

    const response = {
      ...defaultRes,
      success: true,
      data: list,
    };

    ctx.body = response;
    ctx.status = 200;
  }
}

module.exports = MenuController;
