import client from './client';

const draws = {
  retrieveOngoing: () => client.get('draws/ongoing'),
};

export default draws;
