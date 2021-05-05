import client from './client';

const draws = {
  retrieveOngoing: () => client.get('draws/ongoing'),
  retrieveMetadata: async () => {
    const { data } = await client.get('draws/metadata');
    return data;
  },
};

export default draws;
