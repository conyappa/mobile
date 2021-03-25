import client from './client';

const users = {
  setId(userId) {
    client.userId = userId;
  },
  resetId() {
    delete client.userId;
  },
  create: (createParams) => client.post('users', createParams),
  retrieveSelf: () => client.get(`users/${client.userId}`),
};

export default users;
