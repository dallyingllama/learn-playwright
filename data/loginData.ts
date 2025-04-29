export const loginData = [
  { dataname: 'valid', username: 'standard_user', password: 'secret_sauce'},
  { dataname: 'locked', username: 'locked_out_user', password: 'secret_sauce'},
  { dataname: 'invalid username', username: 'invalid_user', password: 'secret_sauce'},
  { dataname: 'invalid password', username: 'standard_user', password: 'invalid_password'},
  { dataname: 'empty username', username: '', password: 'secret_sauce' },
  { dataname: 'empty password', username: 'standard_user', password: '' },
  { dataname: 'empty fields', username: '', password: '' },
  { dataname: 'long username', username: 'a'.repeat(256), password: 'secret_sauce' },
  { dataname: 'long password', username: 'standard_user', password: 'a'.repeat(256) }
]