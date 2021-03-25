import client from './client';

const auth = {
  isLogged() {
    return !!client.defaults.headers.common.Authorization;
  },
  setToken(token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  resetToken() {
    delete client.defaults.headers.common.Authorization;
  },
  login: (email, password) => client.post('login', { email, password }),
};

export default auth;
