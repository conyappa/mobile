import client from './client';

const auth = {
  login: (email, password) => client.post('auth/login', { email, password }),
  refresh: (refresh) => client.post('auth/refresh', { refresh }),
};

export default auth;
