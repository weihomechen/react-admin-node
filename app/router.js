'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/logout', controller.user.logout);
  router.get('/api/user', controller.user.info);
  router.get('/api/user/list', controller.user.list);
  router.get('/api/dashboard', controller.dashboard.index);
  router.get('/api/menu/list', controller.menu.list);
};
