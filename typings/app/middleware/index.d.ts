// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Auth from '../../../app/middleware/auth';
import ErrorHandler from '../../../app/middleware/error_handler';
import NotfoundHandler from '../../../app/middleware/notfound_handler';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof Auth;
    errorHandler: typeof ErrorHandler;
    notfoundHandler: typeof NotfoundHandler;
  }
}
