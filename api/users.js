import client from './client';

const users = {
  create: (createParams) => client.post('users', createParams),
  retrieve: (userId) => client.get(`users/${userId}`),
};

export default users;
