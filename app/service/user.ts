import { Service } from 'egg';
import { User } from '../utils/interface';

export default class UserService extends Service {
  /**
   * user register
   * @param user - User
   */
  public async register(user: User) {
    const { ctx } = this;
    try {
      const res = await ctx.model.User.create(user);

      return res;
    } catch (error) {
      return { error };
    }
  }
}
