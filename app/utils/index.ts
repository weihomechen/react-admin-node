export const passwordSecret = 'react admin';

export interface Response {
  success: boolean;
  data?: object | null;
  msg?: string;
  code?: string;
};

export const defaultRes: Response = {
  success: false,
  msg: '',
  code: '',
  data: null,
};
