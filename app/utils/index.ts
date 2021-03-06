import { Response } from './interface';

function getSuffix(filename: string): string {
  const pos = filename.lastIndexOf('.');
  let suffix = '';

  if (pos !== -1) {
    suffix = filename.substring(pos);
  }
  return suffix;
}

export const passwordSecret = 'react admin';

export const defaultRes: Response = {
  success: false,
  msg: '',
  code: '',
  data: null,
};

export const getFileName = (filename: string): string => {
  const suffix = getSuffix(filename);
  const len = 32;
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < len; i += 1) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return suffix ? `${pwd}${suffix}` : '';
};
