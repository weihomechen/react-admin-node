import { Controller } from 'egg';
import { Response } from '../utils/interface';

export default class ProjectController extends Controller {
  public async notice() {
    const { ctx } = this;
    let response: Response;

    response = {
      success: true,
      data: [],
    };

    ctx.body = response;
    ctx.status = 200;
  }

  public async list() {
    const { ctx } = this;
    let response: Response;

    response = {
      success: true,
      data: [],
    };

    ctx.body = response;
    ctx.status = 200;
  }
}
