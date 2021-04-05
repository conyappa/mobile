import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import Constants from 'expo-constants';

let baseURL;
const developmentPort = Constants.manifest.extra.DEVELOPMENT_PORT || '8000';
if (Constants.manifest.releaseChannel === 'production') {
  baseURL = Constants.manifest.extra.PRODUCTION_URL;
// eslint-disable-next-line no-undef
} else if (__DEV__ && Constants.manifest.extra.USE_LOCAL_SERVER) {
  baseURL = Constants.manifest.debuggerHost.split(':').shift().concat(developmentPort);
} else {
  baseURL = Constants.manifest.extra.STAGING_URL;
}

const client = axios.create({
  baseURL,
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

client.interceptors.request.use((config) => {
  const { params } = config;
  return { ...config, params: decamelizeKeys(params) };
});

export default client;
