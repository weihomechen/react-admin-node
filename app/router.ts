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

  router.get('/api/project/notice', controller.project.notice);
  router.get('/api/project/list', controller.project.list);

  router.get('/api/captcha', controller.sms.verifyCode);

  router.get('/api/geographic/province', controller.geographic.province);
  router.get('/api/geographic/city/:province', controller.geographic.city);

  router.get('/api/chart/list', controller.chart.list);
  router.get('/api/tags/list', controller.tags.list);

};
