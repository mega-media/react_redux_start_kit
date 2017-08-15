module.exports = function(Config) {
  const {
    PROJECT_NAME,
    DEVELOP_HOST,
    DEVELOP_PORT,
    PROJECT_ROOT,
    ASSERTS_DIR,
    API_HOST
  } = Config;
  const port = DEVELOP_PORT ? ':' + DEVELOP_PORT : '';

  const site_url = `http://${DEVELOP_HOST}${port}${PROJECT_ROOT}`,
    assets_url = site_url + ASSERTS_DIR;

  return {
    BASE_URL: site_url,
    BASE_PATH: PROJECT_ROOT,

    ASSETS_PATH: ASSERTS_DIR,
    ASSETS_URL: assets_url,

    API_URL: API_HOST
  };
};
