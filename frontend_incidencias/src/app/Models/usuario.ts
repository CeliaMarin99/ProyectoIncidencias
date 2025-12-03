
export interface Usuario {
  id?: number;
  name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  roles: { name: string }[];
  admin:boolean
}