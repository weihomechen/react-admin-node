import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const {
    user,
    project,
    sms,
    geographic,
    chart,
    tags,
  } = controller;

  router.get('/api/user/current', user.info);
  router.get('/api/user/list', user.list);
  router.post('/api/user/login', user.login);
  router.post('/api/user/logout', user.logout);
  router.post('/api/user/register', user.register);
  router.post('/api/user/update', user.update);
  router.post('/api/user/updateUsers', user.updateUsers);
  router.post('/api/user/upload', user.upload);
  router.post('/api/user/updateSecurity', user.updateSecurity);

  router.get('/api/project/notice', project.notice);
  router.get('/api/project/list', project.list);

  router.get('/api/captcha', sms.verifyCode);

  router.get('/api/geographic/province', geographic.province);
  router.get('/api/geographic/city/:province', geographic.city);

  router.get('/api/chart/list', chart.list);
  router.get('/api/tags/list', tags.list);
};
