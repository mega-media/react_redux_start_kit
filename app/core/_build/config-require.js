const { BUILD_COMBINE } = require('../../../config/env');
const path = require('path');
const fs = require('fs');
const util = require('util');

const _LEGAL_EXTENSION = ['.js'];

const getDirPath = (...dir) => path.resolve(__dirname, '../../src/', ...dir);

function _requireLoop(directory, content) {
  if (!fs.existsSync(getDirPath(directory))) return content;

  const dirs = fs.readdirSync(getDirPath(directory));
  for (const i in dirs) {
    /* 名稱為 _ 開頭跳過 */
    if (dirs[i].substring(0, 1) === '_') continue;

    const dirOrFile = getDirPath(directory, dirs[i]);
    /* 判斷是不是資料夾 */
    if (fs.statSync(dirOrFile).isDirectory()) {
      _requireLoop(path.join(directory, dirs[i]), content);
    } else if (_LEGAL_EXTENSION.includes(path.extname(dirs[i]))) {
      content.push(`require('@src/${path.join(directory, dirs[i])}').default`);
    }
  }
  return content;
}

function writeConfigRequire() {
  let contentStream = '';
  if (BUILD_COMBINE) {
    const stream = Array.isArray(BUILD_COMBINE)
      ? BUILD_COMBINE
      : [BUILD_COMBINE];

    contentStream = stream.reduce(function(contentStr, obj) {
      const { name = null, path = '', paths = [] } = obj;
      if (!name) return contentStr;
      if (!Array.isArray(paths)) throw 'paths 格式錯誤';
      if (typeof path !== 'string') throw 'path 格式錯誤';

      if (path === '' && paths.length === 0) return contentStr;
      const rootPaths = paths.length > 0 ? paths : [path];

      contentStr +=
        name +
        ':[\n' +
        rootPaths
          .reduce(function(arr, dir) {
            return _requireLoop(dir, arr);
          }, [])
          .join(',\n') +
        '],';

      return contentStr;
    }, '');
  }

  const dir = path.resolve(__dirname, '../roots');
  try {
    fs.writeFileSync(
      path.join(dir, '_config.js'),
      'export default { ' + contentStream + ' } '
    );
  } catch (err) {
    console.log('[fs]', 'writeConfigRequire 檔案寫入失敗！ : ', err);
  }
}

writeConfigRequire();
