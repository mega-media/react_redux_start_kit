const path = require('path');
const fs = require('fs');

const _LEGAL_EXTENSION = ['.js'];

const getDirPath = (...dir) =>
  path.resolve(__dirname, '../../src/locales', ...dir);

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
      content.push(
        `...require('@src/locales/${path.join(directory, dirs[i])}').default`
      );
    }
  }
  return content;
}

function writeLocalesRequire() {
  let contentStream = [];
  const dirs = fs.readdirSync(getDirPath());
  for (const i in dirs) {
    /* 名稱為 _ 開頭跳過 */
    if (dirs[i].substring(0, 1) === '_') continue;

    const targetDirOrFile = getDirPath(dirs[i]);
    if (fs.statSync(targetDirOrFile).isDirectory()) {
      /* 資料夾 */
      contentStream.push(
        "'" + dirs[i] + "': {\n" + _requireLoop(dirs[i], []).join(',\n') + '\n}'
      );
    } else if (_LEGAL_EXTENSION.includes(path.extname(dirs[i]))) {
      /* 不是資料夾 */
      contentStream.push(
        "'" +
          dirs[i].replace('.js', '') +
          "': " +
          `require('@src/locales/${dirs[i]}').default`
      );
    }
  }

  const dir = path.resolve(__dirname, '../roots');

  try {
    fs.writeFileSync(
      path.join(dir, '_locale.js'),
      'export default {\n' + contentStream.join(',\n') + '\n}'
    );
  } catch (err) {
    console.log('[fs]', 'writeLocalesRequire 檔案寫入失敗！ : ', err);
  }
}

writeLocalesRequire();
