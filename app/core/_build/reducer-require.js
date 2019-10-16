const path = require('path');
const fs = require('fs');

const _LEGAL_EXTENSION = ['.js'];

const getDirPath = (...dir) =>
  path.resolve(__dirname, '../../src/storage/reducers', ...dir);

function writeReducerRequire() {
  let contentStream = [],
    keysTemp = [];
  const dirs = fs.readdirSync(getDirPath());
  for (const i in dirs) {
    /* 名稱為 _ 開頭跳過 */
    if (dirs[i].substring(0, 1) === '_') continue;

    const targetDirOrFile = getDirPath(dirs[i]);
    /* 是資料夾就跳過 */
    if (fs.statSync(targetDirOrFile).isDirectory()) continue;

    /* 副檔名不正確就跳過 */
    if (!_LEGAL_EXTENSION.includes(path.extname(targetDirOrFile))) continue;

    const key = dirs[i].replace('.js', '');
    if (keysTemp.includes(key)) {
      console.log('鍵值重複：' + key);
      return false;
    }
    keysTemp.push(key);
    contentStream.push(
      "'" + key + "': require('@src/storage/reducers/" + dirs[i] + "').default"
    );
  }

  const dir = path.resolve(__dirname, '../roots');

  try {
    fs.writeFileSync(
      path.join(dir, '_reducer.js'),
      'export default {\n' + contentStream.join(',\n') + '\n}'
    );
  } catch (err) {
    console.log('[fs]', 'writeReducerRequire 檔案寫入失敗！ : ', err);
  }
}

writeReducerRequire();
