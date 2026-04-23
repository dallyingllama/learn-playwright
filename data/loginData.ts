export type LoginType = 'valid' | 'invalid';

export interface LoginDataEntry {
  dataname: string;
  logintype: LoginType;
  username: string;
  password: string;
}

export const loginData: LoginDataEntry[] = [
  { dataname: 'registered', logintype: 'valid', username: 'bob.slydel', password: 'Password123!' },
  { dataname: 'unregistered', logintype: 'invalid', username: 'invalid_user', password: 'invalid_password' },
  { dataname: 'invalid username', logintype: 'invalid', username: 'invalid_user', password: 'Password123!' },
  { dataname: 'invalid password', logintype: 'invalid', username: 'bob.slydel', password: 'invalid_password' },
  { dataname: 'missing username', logintype: 'invalid', username: '', password: 'Password123!' },
  { dataname: 'missing password', logintype: 'invalid', username: 'bob.slydel', password: '' },
];
