import { Controller } from 'egg';
import { cityMap, provinceList } from '../utils/geographic';
import { Response } from '../utils/interface';

export default class Geographic extends Controller {
  public async province() {
    const { ctx } = this;
    let response: Response;

    response = {
      success: true,
      data: provinceList,
    };

    ctx.body = response;
    ctx.status = 200;
  }

  public async city() {
    const { ctx } = this;
    const { province } = ctx.params;
    let response: Response;

    response = {
      success: true,
      data: cityMap[province],
    };

    ctx.body = response;
    ctx.status = 200;
  }
}
