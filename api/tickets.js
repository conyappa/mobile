import client from './client';

const tickets = {
  retrieve: (userId, params) => client.get(`users/${userId}/tickets`, { params }),
};

export default tickets;
