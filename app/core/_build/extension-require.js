const path = require('path');
const fs = require('fs');

const _LEGAL_EXTENSION = ['.js', '.jsx'];

const getDirPath = (...dir) => path.resolve(__dirname, '../../', ...dir);

/* 掃描擴充資料夾檔案 */
function writeExtensionsRequire() {
  /* 不能擴充的路徑名稱 */
  const THESE_DIRECTORIES_COULD_NOT_BEEN_COVER = ['roots', 'store'];

  /* 變更檔名 */
  const fileRename = filename =>
    filename
      .replace('.js', '')
      .split('-')
      .reduce(function(name, split, index) {
        if (index === 0) return split;
        return (
          name +
          split.substring(0, 1).toUpperCase() +
          split.substring(1, split.length)
        );
      }, '');

  /* core/ 建立索引檔 */
  function init(rootPath = 'core') {
    function dirLoop(dirRootPath) {
      /* 是不是非法路徑 */
      if (
        THESE_DIRECTORIES_COULD_NOT_BEEN_COVER.map(
          str => 'core/' + str.replace(/\./g, '/')
        ).includes(dirRootPath)
      ) {
        const dirs = fs.readdirSync(getDirPath(dirRootPath));
        /* 向下尋找 */
        for (const i in dirs) {
          const targetDir = getDirPath(dirRootPath, dirs[i]);
          /* 不是資料夾就跳過 */
          if (!fs.statSync(targetDir).isDirectory()) continue;
          /* 掃描資料夾 */
          dirLoop(path.join(dirRootPath, dirs[i]));
        }
        return false;
      }
      let content = [];
      if (dirRootPath === 'core/_build') return false;
      /* dist/core/container 需要多引入的東東 */
      if (dirRootPath === 'core/container')
        content.push(`export { compose } from 'redux';`);

      const dirRootResolvePath = fs.readdirSync(getDirPath(dirRootPath));
      for (const i in dirRootResolvePath) {
        const dirRootFile = dirRootResolvePath[i];
        const dirRootFileResolvePath = getDirPath(dirRootPath, dirRootFile);

        /* 檔案為 index.js 跳過 */
        if (dirRootFile === 'index.js') continue;

        /* 檔案為 _ 開頭跳過 */
        if (dirRootFile.substring(0, 1) === '_') continue;

        /* 檔案為資料夾，向下查詢 */
        const fileOrDir = fs.statSync(dirRootFileResolvePath);
        if (fileOrDir.isDirectory())
          dirLoop(path.join(dirRootPath, dirRootFile));

        /* 副檔名不正確就跳過 */
        if (!_LEGAL_EXTENSION.includes(path.extname(dirRootFile))) continue;

        /* 寫入索引 */
        content.push(
          `export { default as ${fileRename(
            dirRootFile
          )} } from './${dirRootFile}';`
        );
      }

      /* 沒有內容就不用建索引 */
      if (content.length === 0) return false;

      try {
        fs.writeFileSync(
          getDirPath(dirRootPath, 'index.js'),
          content.join('\n')
        );
      } catch (err) {
        console.log(
          '[fs]',
          'writeExtensionsRequire init 檔案寫入失敗！ : ',
          err
        );
      }
    }

    const dirs = fs.readdirSync(getDirPath(rootPath));
    for (const i in dirs) {
      const targetDir = getDirPath(rootPath, dirs[i]);
      /* 不是資料夾就跳過 */
      if (!fs.statSync(targetDir).isDirectory()) continue;
      /* 掃描資料夾 */
      dirLoop(path.join(rootPath, dirs[i]));
    }
  }

  /* 路徑轉換 */
  const corePath = function(extensionsDir) {
    return getDirPath('core', extensionsDir.replace(/\./g, '/'));
  };

  /* 寫入擴充 */
  function extension() {
    /* 沒有擴充資料夾就不用擴充囉 */
    const isHasExtension = fs.existsSync(getDirPath('extensions'));
    if (!isHasExtension) return false;

    const dirs = fs.readdirSync(getDirPath('extensions'));
    for (const i in dirs) {
      const extensionsDir = dirs[i];
      if (THESE_DIRECTORIES_COULD_NOT_BEEN_COVER.includes(extensionsDir)) {
        console.log('這個資料夾不能擴充：' + extensionsDir);
        return false;
      }

      /* 要擴充的資料夾不存在就跳過 */
      const targetDir = corePath(extensionsDir);
      if (!fs.existsSync(targetDir)) continue;

      /* 取得擴充檔案 */
      const extensionFiles = fs.readdirSync(
        getDirPath('extensions', extensionsDir)
      );
      let content = [];
      if (extensionsDir === 'container')
        content.push(`export { compose } from 'redux';`);

      extensionFiles.forEach(function(filename) {
        if (filename === 'index.js') {
          console.log('擴充檔名不能為 index.js');
          return;
        }
        /* 底線開頭的檔案跳過 */
        if (filename.substring(0, 1) === '_') return;

        /* 判斷是不是資料夾 */
        const fileOrDir = fs.statSync(
          getDirPath('extensions', extensionsDir, filename)
        );
        /* 不是資料夾且副檔名不正確就跳過 */
        if (
          !fileOrDir.isDirectory() &&
          !_LEGAL_EXTENSION.includes(path.extname(filename))
        )
          return;

        content.push(
          `export { default as ${fileRename(
            filename
          )} } from '@ext/${extensionsDir}/${filename}';`
        );
      });

      /* 沒有內容就不用寫入 */
      if (content.length === 0) return false;

      try {
        fs.appendFileSync(
          corePath(extensionsDir) + `/index.js`,
          '\n' + content.join('\n')
        );
      } catch (err) {
        console.log(
          '[fs]',
          'writeExtensionsRequire extension 檔案寫入失敗！ : ',
          err
        );
      }
    }
  }

  init();
  extension();
}

writeExtensionsRequire();
