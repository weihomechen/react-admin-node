import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/api/user/current', controller.user.info);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/logout', controller.user.logout);
  router.post('/api/user/register', controller.user.register);
};
