/* eslint-disable no-undef */
import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    DEVELOPMENT_SCHEMA: process.env.DEVELOPMENT_SCHEMA,
    DEVELOPMENT_HOST: process.env.DEVELOPMENT_HOST,
    DEVELOPMENT_PORT: process.env.DEVELOPMENT_PORT,
    DEVELOPMENT_API_VERSION: process.env.DEVELOPMENT_API_VERSION,
    STAGING_URL: process.env.STAGING_URL,
    PRODUCTION_URL: process.env.PRODUCTION_URL,
  },
});
