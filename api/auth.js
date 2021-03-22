import client from './client';

const auth = {
  isLogged() {
    return !!client.defaults.headers.common.Authentication;
  },
  setToken({ token }) {
    client.defaults.headers.common.Authentication = `Bearer ${token}`;
  },
  resetToken() {
    delete client.defaults.headers.common.Authentication;
  },
  login: (email, password) => client.post('login', { email, password }),
};

export default auth;
