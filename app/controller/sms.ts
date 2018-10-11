import { Controller } from 'egg';
import { Response } from '../utils/interface';

export default class SMS extends Controller {
  public async verifyCode() {
    const { ctx, service } = this;
    const { mobile } = ctx.query;
    let response: Response;

    const success = await service.sms.send(mobile);

    response = {
      success,
    };

    ctx.body = response;
    ctx.status = 200;
  }
}
