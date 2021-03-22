/* eslint-disable no-undef */
import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    PRODUCTION_URL: process.env.PRODUCTION_URL,
    STAGING_URL: process.env.STAGING_URL,
    USE_LOCAL_SERVER: process.env.USE_LOCAL_SERVER === 'true',
    LOCAL_URL: process.env.LOCAL_URL,
  },
});
