const Controller = require('egg').Controller;
const { fakeChartData } = require('../../mock/dashboard');

class DashboardController extends Controller {
  async chart() {
    const { ctx } = this;

    ctx.body = fakeChartData;
    ctx.status = 200;
  }

  async tags() {
    const { ctx } = this;

    ctx.body = fakeChartData;
    ctx.status = 200;
  }
}

module.exports = DashboardController;
