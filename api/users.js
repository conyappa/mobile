import client from './client';

const users = {
  create: (createParams) => client.post('users', createParams),
};

export default users;
