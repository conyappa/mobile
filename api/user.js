import client from './client';

const user = {
  setId(userId) {
    client.userId = userId;
  },
  resetId() {
    delete client.userId;
  },
  fetchProfile: () => client.get(`users/${client.userId}`),
};

export default user;
