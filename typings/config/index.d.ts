// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import { EggAppConfig } from 'egg';
import ExportConfigDefault from '../../config/config.default';
import ExportConfigLocal from '../../config/config.local';
import * as ExportConfigPrivate from '../../config/config.private';
import ExportConfigProd from '../../config/config.prod';
type ConfigDefault = ReturnType<typeof ExportConfigDefault>;
type ConfigLocal = ReturnType<typeof ExportConfigLocal>;
type ConfigPrivate = typeof ExportConfigPrivate;
type ConfigProd = ReturnType<typeof ExportConfigProd>;
declare module 'egg' {
  type NewEggAppConfig = ConfigDefault & ConfigLocal & ConfigPrivate & ConfigProd;
  interface EggAppConfig extends NewEggAppConfig { };
}