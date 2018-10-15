import { Controller } from 'egg';
import list from '../../mock/tags';
import { Response } from '../utils/interface';

export default class ChartController extends Controller {
  public async list() {
    const { ctx } = this;
    let response: Response;

    response = {
      success: true,
      data: list,
    };

    ctx.body = response;
    ctx.status = 200;
  }
}
