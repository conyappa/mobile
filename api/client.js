import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import Constants from 'expo-constants';

let baseURL;

const developmentSchema = Constants.manifest.extra.DEVELOPMENT_SCHEMA || 'http';
const developmentHost = Constants.manifest.extra.DEVELOPMENT_HOST || Constants.manifest.debuggerHost.split(':').shift().replace(/^packager./, '');
const developmentPort = Constants.manifest.extra.DEVELOPMENT_PORT || '8000';
const developmentAPIVersion = Constants.manifest.extra.DEVELOPMENT_API_PORT || 'v1';

if (Constants.manifest.releaseChannel === 'production') {
  baseURL = Constants.manifest.extra.PRODUCTION_URL;
} else if (__DEV__) { // eslint-disable-line no-undef
  baseURL = `${developmentSchema}://${developmentHost}:${developmentPort}/${developmentAPIVersion}`;
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
