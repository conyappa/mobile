import client from './client';

const draws = {
  retrieveOngoing: () => client.get('draws/ongoing'),
  retrieveMetadata: () => client.get('draws/metadata'),
};

export default draws;
