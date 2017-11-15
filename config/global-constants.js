const url = require('url');
const Config = require(process.env.NODE_ENV === 'production'
  ? './env/prov'
  : './env/dev');

const {
  PROJECT_NAME,
  PROJECT_HOST,
  PROJECT_PORT,
  PROJECT_PATH,
  ASSETS_PATH,
  API_HOST
} = Config;

const SITE_URL = `http://${PROJECT_HOST}${PROJECT_PORT
  ? ':' + PROJECT_PORT
  : ''}`;

module.exports = {
  PROJECT_NAME,
  PROJECT_HOST,
  PROJECT_PORT,
  PROJECT_PATH,
  API_HOST,
  BASE_URL: url.resolve(SITE_URL, PROJECT_PATH),
  BASE_PATH: PROJECT_PATH,
  ASSETS_URL: url.resolve(SITE_URL, ASSETS_PATH),
  ASSETS_PATH
};
