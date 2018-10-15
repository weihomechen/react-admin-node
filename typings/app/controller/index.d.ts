// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Chart from '../../../app/controller/chart';
import Geographic from '../../../app/controller/geographic';
import Project from '../../../app/controller/project';
import Sms from '../../../app/controller/sms';
import Tags from '../../../app/controller/tags';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    chart: Chart;
    geographic: Geographic;
    project: Project;
    sms: Sms;
    tags: Tags;
    user: User;
  }
}
