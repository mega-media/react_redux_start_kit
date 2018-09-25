const { INCLUDE_ASSETS } = require('../../../config/env');
const path = require('path');
const fs = require('fs');

const _LEGAL_EXTENSION = ['.css', '.scss', '.sass'];

function writeAssetsRequire() {
  function requireLoop(directoryOrFile) {
    let content = [];
    const targetPath = path.resolve(
      __dirname,
      `../../assets/${directoryOrFile}`
    );
    const isExist = fs.existsSync(targetPath);
    if (isExist) {
      const target = fs.statSync(targetPath);
      if (target.isDirectory()) {
        const child = fs.readdirSync(targetPath);
        for (const i in child) {
          if (child[i].substring(0, 1) !== '_') {
            content = [
              ...content,
              ...requireLoop(`${directoryOrFile}/${child[i]}`)
            ];
          }
        }
      } else if (_LEGAL_EXTENSION.includes(path.extname(directoryOrFile))) {
        content.push(`require('@assets/${directoryOrFile}')`);
      }
    } else {
      console.log('檔案不存在：' + directoryOrFile);
    }
    return content;
  }

  let exportContent = [];
  if (INCLUDE_ASSETS.trim() !== '') {
    const dirName = INCLUDE_ASSETS.split(',');
    exportContent = dirName.reduce(function(content, directoryOrFile) {
      return content.concat(requireLoop(directoryOrFile.trim()));
    }, []);
  }

  try {
    fs.writeFileSync(
      path.resolve(__dirname, '../container/_assets.js'),
      'export default [' + exportContent.join(',\n') + ']'
    );
  } catch (err) {
    console.log('[fs]', 'writeAssetsRequire 檔案寫入失敗！ : ', err);
  }
}

writeAssetsRequire();
