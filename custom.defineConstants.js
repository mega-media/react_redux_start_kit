module.exports = function (Config) {
    const basename = Config.Constants.basename,
        assetsDir = Config.Constants.assetsDir,
        host = Config.Constants.host,
        port = Config.Constants.port ? ":" + Config.Constants.port : "";

    const site_url = `http://${host}${port}${basename}`,
        assets_url = site_url + assetsDir;

    return {
        "BASE_URL": site_url,
        "BASE_PATH": basename,

        "ASSETS_PATH": assetsDir,
        "ASSETS_URL": assets_url
    }
};


