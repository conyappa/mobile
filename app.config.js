/* eslint-disable no-undef */
import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    DEVELOPMENT_URL: process.env.DEVELOPMENT_URL,
    STAGING_URL: process.env.STAGING_URL,
    PRODUCTION_URL: process.env.PRODUCTION_URL,
  },
});
