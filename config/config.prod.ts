import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    cluster: {
      listen: {
        port: 7002,
      },
    },
  };

  return config;
};
