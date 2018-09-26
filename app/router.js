'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/user/current', controller.user.info);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/logout', controller.user.logout);
  router.post('/api/user/register', controller.user.register);

  // router.get('/api/user/list', controller.user.list);
  // router.get('/api/dashboard', controller.dashboard.index);
  // router.get('/api/menu/list', controller.menu.list);
};
