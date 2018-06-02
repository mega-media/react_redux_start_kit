const config = require('../config/global-constants');
const path = require('path');
const fs = require('fs');

/* 掃描 config.BUILD_DIRECTORIES 底下的所有 config.js */
function writeConfigRequiredBy() {
  /* 掃描函式 */
  function requireLoop(directory, root = './') {
    let content = [];
    /* 讀取資料夾 */
    const dirs = fs.readdirSync(
      path.resolve(__dirname, `./dist/${directory}/`, root)
    );
    /* 讀取檔案 */
    for (const i in dirs) {
      /* 檔案相對路徑 */
      const rootDir = path.join(root, dirs[i]);
      /* 取得 config.js 檔案 */
      if (rootDir === 'config.js') {
        /* 寫入 require */
        content.push(`require('~/${directory}/config').default`);
      } else {
        /* 當前檔案的絕對路徑 */
        const dirPath = path.resolve(
          __dirname,
          `./dist/${directory}/`,
          rootDir
        );
        /* 不是 config.js 也不是資料夾，就跳過 */
        if (!fs.statSync(dirPath).isDirectory()) {
          continue;
        }
        /* 底下有 config.js 檔案 */
        if (fs.existsSync(dirPath + '/config.js')) {
          /* 寫入 require */
          content.push(`require('~/${directory}/${rootDir}/config').default`);
        }
        /* 繼續向下找 */
        const subConfigs = requireLoop(directory, rootDir);
        /* 將執行結果合併 */
        content = [...content, ...subConfigs];
      }
    }
    return content;
  }

  /* 開始遞迴 */
  const contentStream = config.BUILD_DIRECTORIES.split(',').reduce(function(
    content,
    directory
  ) {
    return content.concat(requireLoop(directory.trim()));
  },
  []);

  /* 建立檔案 */
  fs.writeFile(
    path.resolve(__dirname, './dist/core/roots/build.js'),
    'export default [' + contentStream.join(',\n') + ']',
    function(err) {
      if (err) {
        console.log('[fs]', 'writeRequiredBy 檔案寫入失敗！');
        return false;
      }
    }
  );
}

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
  function init(rootPath = './dist/core') {
    function dirLoop(dirRootPath) {
      /* 是不是非法路徑 */
      if (
        THESE_DIRECTORIES_COULD_NOT_BEEN_COVER.map(
          str => 'dist/core/' + str.replace(/\./g, '/')
        ).includes(dirRootPath)
      ) {
        const dirs = fs.readdirSync(path.resolve(__dirname, dirRootPath));
        /* 向下尋找 */
        for (const i in dirs) {
          const targetDir = path.resolve(__dirname, dirRootPath, dirs[i]);
          /* 不是資料夾就跳過 */
          if (!fs.statSync(targetDir).isDirectory()) continue;
          /* 掃描資料夾 */
          dirLoop(path.join(dirRootPath, dirs[i]));
        }
        return false;
      }
      let content = [];
      /* dist/core/container 需要多引入的東東 */
      if (dirRootPath === 'dist/core/container')
        content.push(`export { compose } from 'redux';`);

      const dirRootResolvePath = fs.readdirSync(
        path.resolve(__dirname, dirRootPath)
      );
      for (const i in dirRootResolvePath) {
        const dirRootFile = dirRootResolvePath[i];
        const dirRootFileResolvePath = path.resolve(
          __dirname,
          dirRootPath,
          dirRootFile
        );
        /* 檔案為 index.js 跳過 */
        if (dirRootFile === 'index.js') continue;
        /* 檔案為 _ 開頭跳過 */
        if (dirRootFile.substring(0, 1) === '_') continue;
        /* 檔案為資料夾，向下查詢 */
        const fileOrDir = fs.statSync(dirRootFileResolvePath);
        if (fileOrDir.isDirectory())
          dirLoop(path.join(dirRootPath, dirRootFile));
        /* 寫入索引 */
        content.push(
          `export { default as ${fileRename(dirRootFile)} } from './${
            dirRootFile
          }';`
        );
      }

      fs.writeFile(
        path.resolve(__dirname, dirRootPath) + '/index.js',
        content.join('\n'),
        function(err) {
          if (err) {
            console.log('[fs]', 'writeExtensionsRequire 檔案寫入失敗！');
            return false;
          }
        }
      );
    }

    const dirs = fs.readdirSync(path.resolve(__dirname, rootPath));
    for (const i in dirs) {
      const targetDir = path.resolve(__dirname, rootPath, dirs[i]);
      /* 不是資料夾就跳過 */
      if (!fs.statSync(targetDir).isDirectory()) continue;
      /* 掃描資料夾 */
      dirLoop(path.join(rootPath, dirs[i]));
    }
  }

  /* 路徑轉換 */
  const corePath = function(extensionsDir) {
    return path.resolve(
      __dirname,
      './dist/core',
      extensionsDir.replace(/\./g, '/')
    );
  };

  /* 寫入擴充 */
  function extension() {
    /* 沒有擴充資料夾就不用擴充囉 */
    const isHasExtension = fs.existsSync(
      path.resolve(__dirname, './extensions')
    );
    if (!isHasExtension) {
      return false;
    }
    const dirs = fs.readdirSync(path.resolve(__dirname, './extensions'));
    for (const i in dirs) {
      const extensionsDir = dirs[i];
      if (THESE_DIRECTORIES_COULD_NOT_BEEN_COVER.includes(extensionsDir)) {
        console.log('這個資料夾不能擴充：' + extensionsDir);
        return false;
      }
      const targetDir = corePath(extensionsDir);
      if (!fs.existsSync(targetDir)) {
        console.log('請確認資料夾名稱是否正確：' + extensionsDir);
        return false;
      }

      const extensionFiles = fs.readdirSync(
        path.resolve(__dirname, './extensions', extensionsDir)
      );
      let content = [];
      if (extensionsDir === 'container')
        content.push(`export { compose } from 'redux';`);

      extensionFiles.forEach(function(filename) {
        if (filename === 'index.js') {
          console.log('擴充檔名不能為 index.js');
          return;
        }
        if (filename.substring(0, 1) === '_') return;
        content.push(
          `export { default as ${fileRename(filename)} } from 'ext/${
            extensionsDir
          }/${filename}';`
        );
      });

      fs.appendFile(
        corePath(extensionsDir) + `/index.js`,
        '\n' + content.join('\n'),
        function(err) {
          if (err) {
            console.log('[fs]', 'writeExtensionsRequire 檔案寫入失敗！');
            return false;
          }
        }
      );
    }
  }
  init();
  extension();
}

function writeAssetsRequire() {
  function requireLoop(directory) {
    let content = [];
    const targetPath = path.resolve(__dirname, `./assets/${directory}`);
    const isExist = fs.existsSync(targetPath);
    if (isExist) {
      const target = fs.statSync(targetPath);
      if (target.isDirectory()) {
        const dir = fs.readdirSync(targetPath);
        for (const i in dir) {
          if (dir[i].substring(0, 1) !== '_') {
            content = [...content, ...requireLoop(`${directory}/${dir[i]}`)];
          }
        }
      } else {
        content.push(`require('@/${directory}')`);
      }
    } else {
      console.log('檔案不存在：' + directory);
    }
    return content;
  }

  let exportContent = [];
  if (config.INCLUDE_ASSETS.trim() !== '') {
    const dirName = config.INCLUDE_ASSETS.split(',');
    exportContent = dirName.reduce(function(content, directory) {
      return content.concat(requireLoop(directory.trim()));
    }, []);
  }

  fs.writeFile(
    path.join(path.resolve(__dirname, './dist/core/container'), '_assets.js'),
    'export default [' + exportContent.join(',\n') + ']',
    function(err) {
      if (err) {
        console.log('[fs]', 'writeAssetsRequire 檔案寫入失敗！');
        return false;
      }
    }
  );
}

writeAssetsRequire();
writeConfigRequiredBy();
writeExtensionsRequire();
