const path = require('path');
const fs = require('fs');
const util = require('util');

const getDirPath = (...dir) =>
  path.resolve(__dirname, '../../', './src/dist/pages/', ...dir);

/* 掃描路由資料夾檔案 */
function writeRouterRequire() {
  let contentStream = [];
  let routerOpts = {};
  /* 找有沒有.routeropt */
  if (fs.existsSync(getDirPath('.routeropt'))) {
    routerOpts = JSON.parse(fs.readFileSync(getDirPath('.routeropt')));
  }

  const dirs = fs.readdirSync(getDirPath());
  for (const i in dirs) {
    const targetDir = getDirPath(dirs[i]);
    /* 不是資料夾就跳過 */
    if (!fs.statSync(targetDir).isDirectory()) continue;
    /* 名稱為 _ 開頭跳過 */
    if (dirs[i].substring(0, 1) === '_') continue;

    /* 找.routeropt 有沒有這個路由的設定 */
    const opts = routerOpts[dirs[i]] || {};

    contentStream.push(
      '{\n' +
        "  path: '" +
        (opts.path || `/${dirs[i]}`) +
        "',\n" +
        "  component: require('@src/dist/pages/" +
        dirs[i] +
        (opts.component || '') +
        "').default,\n" +
        '  params: ' +
        util.inspect(opts.params || {}) +
        '\n' +
        '}'
    );
  }

  try {
    fs.writeFileSync(
      path.resolve(__dirname, '../roots/_router.js'),
      'export default [\n' + contentStream.join(',\n') + '\n]'
    );
  } catch (err) {
    console.log('[fs]', 'writeRouterRequire 檔案寫入失敗！ : ', err);
  }
}

writeRouterRequire();
