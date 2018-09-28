const required = false;

export const registerRule = {
  name: { type: 'string', max: 18 },
  mobile: { type: 'string', max: 11 },
  password: { type: 'string' },
  countryCode: { type: 'string' },
  captcha: { type: 'string' },
  email: { type: 'string', required },
};

export const loginRule = {
  userName: { type: 'string', required },
  password: { type: 'string', required },
  mobile: { type: 'string', required },
  captcha: { type: 'string', required },
  type: { type: 'string' },
};
