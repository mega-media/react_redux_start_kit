module.exports = function(Config) {
  const basename = Config.basename,
    assetsRoot = Config.assetsRoot,
    host = Config.host,
    port = Config.port ? ':' + Config.port : '';

  const site_url = `http://${host}${port}${basename}`,
    assets_url = site_url + assetsRoot;

  return {
    BASE_URL: site_url,
    BASE_PATH: basename,

    ASSETS_PATH: assetsRoot,
    ASSETS_URL: assets_url
  };
};
