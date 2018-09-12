'use strict';

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.mysql = {
  enable: false,
  package: 'egg-mysql',
};

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
};

exports.session = true;

exports.oss = {
  enable: true,
  package: 'egg-oss',
};

exports.io = {
  enable: true,
  package: 'egg-socket.io',
};
