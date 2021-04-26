import client from './client';

const devices = {
  create: (userId, createParams) => client.post(`users/${userId}/devices`, createParams),
};

export default devices;
