import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import Constants from 'expo-constants';

let baseURL;
if (Constants.manifest.extra.USE_LOCAL_SERVER) {
  baseURL = Constants.manifest.extra.LOCAL_URL;
} else {
  baseURL = Constants.manifest.releaseChannel === 'production'
    ? Constants.manifest.extra.PRODUCTION_URL
    : Constants.manifest.extra.STAGING_URL;
}

const client = axios.create({
  baseURL: `${baseURL}/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [
    ...axios.defaults.transformResponse,
    (data) => camelizeKeys(data),
  ],
  transformRequest: [
    (data) => decamelizeKeys(data),
    ...axios.defaults.transformRequest,
  ],
});

export default client;
