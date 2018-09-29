import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + 'admin';

  // add your egg config in here
  config.middleware = ['auth'];

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/admin',
      options: {},
    },
  };

  config.security = {
    ignore: '/api/',
    domainWhiteList: [
      'http://127.0.0.1:8080',
      'http://118.25.16.129:80',
      'http://localhost:8080',
    ],
    methodnoallow: { enable: false },
    csrf: {
      enable: false,
      ignoreJSON: false, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };

  config.cors = {
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH',
  };

  config.multipart = {
    fileExtensions: ['.xls', '.doc', '.ppt', '.docx', '.xlsx', '.pptx'],
  };

  config.redis = {
    client: {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      db: '5',
    },
  };

  config.sessionRedis = {
    name: '',
  };

  config.session = {
    key: 'ADMIN_SESS',
    maxAge: 24 * 3600 * 1000, // 1天
    httpOnly: true,
    encrypt: true,
  };

  // 免登白名单
  config.whiteList = [
    '^/$',                  // 首页
    '^/login$',             // 登录页面

    '^/api/user/info',      // 获取用户信息
    '^/api/user/login$',    // 用户登录接口
    '^/api/user/register$', // 用户注册接口
  ];

  config.bodyParser = {
    jsonLimit: '5mb',
    formLimit: '6mb',
  };

  config.oss = {
    client: {
      accessKeyId: '***',
      accessKeySecret: '***',
      bucket: '***',
      endpoint: 'oss-cn-hangzhou.aliyuncs.com',
      timeout: '60s',
      secure: true,
    },
  };

  config.io = {
    init: {
      wsEngine: 'uws',
    },
    namespace: {
      '/': {
        connectionMiddleware: ['auth'],
        packetMiddleware: ['filter'],
      },
    },
    redis: {
      host: '127.0.0.1',
      port: '6379',
      auth_pass: '',
      db: '6',
    },
  };

  // the return config will combines to EggAppConfig
  return config;
};
