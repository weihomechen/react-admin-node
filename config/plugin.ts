import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  session: true,
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },
  oss: {
    enable: true,
    package: 'egg-oss',
  },
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
};

export default plugin;
