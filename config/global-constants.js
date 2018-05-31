const url = require('url');
const Config = require(process.env.NODE_ENV === 'production'
  ? './env/prod'
  : './env/dev');

const {
  PROJECT_NAME,
  PROJECT_HOST,
  PROJECT_PORT,
  ROUTE_BASE,
  INCLUDE_ASSETS,
  BUILD_DIRECTORIES,
  ENABLE_DEV_TOOLS
} = Config;

module.exports = {
  PROJECT_NAME,
  PROJECT_HOST,
  PROJECT_PORT,
  ROUTE_BASE,
  INCLUDE_ASSETS,
  BUILD_DIRECTORIES,
  ENABLE_DEV_TOOLS
};
