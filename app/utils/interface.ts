export interface Response {
  success: boolean;
  data?: object | null;
  msg?: string;
  code?: string;
}

interface Tag {
  key: string;
  label: string;
}

interface Geographic {
  province: object;
  city: object;
}

export interface User {
  name: string;
  pwd: string;
  mobile: string;
  email?: string;
  role?: string;
  avatar?: string;
  address?: string;
  signature?: string;
  title?: string;
  group?: string;
  tags?: Tag[];
  countryCode?: number;
  geographic?: Geographic;
}
