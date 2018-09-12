const Controller = require('egg').Controller;
const { index } = require('../../mock/dashboard');
const { defaultRes } = require('../utils');

class DashboardController extends Controller {
  async index() {
    const { ctx } = this;

    const response = {
      ...defaultRes,
      success: true,
      data: index,
    };

    ctx.body = response;
    ctx.status = 200;
  }
}

module.exports = DashboardController;
