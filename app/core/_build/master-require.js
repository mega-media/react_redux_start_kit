const path = require('path');
const fs = require('fs');

/* 掃描路由資料夾檔案 */
function writeMasterRequire() {
  const isExist = fs.existsSync(
    path.resolve(__dirname, '../../', './src/dist/master')
  );
  try {
    fs.writeFileSync(
      path.resolve(__dirname, '../roots/_master.js'),
      `export default ${
        isExist ? `require('@src/dist/master').default;` : 'null;'
      }`
    );
  } catch (err) {
    console.log('[fs]', 'writeMasterRequire 檔案寫入失敗！ : ', err);
  }
}

writeMasterRequire();
