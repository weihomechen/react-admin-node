import { Controller } from 'egg';
import chartData from '../../mock/chart';
import { Response } from '../utils/interface';

export default class ChartController extends Controller {
  public async list() {
    const { ctx } = this;
    let response: Response;

    response = {
      success: true,
      data: chartData,
    };

    ctx.body = response;
    ctx.status = 200;
  }
}
