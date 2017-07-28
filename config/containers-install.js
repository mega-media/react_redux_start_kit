const path = require('path');
const fs = require('fs');

module.exports = {
  installContent: [],
  build: function() {
    const appRoot = function(params) {
      return path.resolve(__dirname, '../app/dist/Containers/' + params);
    };

    const dirs = fs.readdirSync(appRoot(''));
    for (var i in dirs) {
      var dirPath = appRoot(dirs[i]);
      if (!fs.statSync(dirPath).isDirectory()) {
        continue;
      }
      if (!fs.existsSync(dirPath + '/Config.js')) {
        continue;
      }
      this.installContent.push("require('./" + dirs[i] + "/Config')");
    }
    fs.writeFile(
      appRoot('install.js'),
      'export default [' + this.installContent + ']',
      function(err) {
        if (err) {
          console.log('[fs]', 'install.js 檔案寫入失敗！');
          return false;
        }
      }
    );
  }
};
