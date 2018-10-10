import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/api/user/current', controller.user.info);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/logout', controller.user.logout);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/update', controller.user.update);
  router.post('/api/user/upload', controller.user.upload);
  router.post('/api/user/updateSecurity', controller.user.updateSecurity);


  router.get('/api/geographic/province', controller.geographic.province);
  router.get('/api/geographic/city/:province', controller.geographic.city);
};
