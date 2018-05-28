const path = require('path');
const fs = require('fs');

function requireFiles(directory, filename) {
  return function requireLoop(root = './') {
    let content = [];
    const dirs = fs.readdirSync(
      path.resolve(__dirname, `./dist/${directory}/`, root)
    );
    for (const i in dirs) {
      const rootDir = path.join(root, dirs[i]);
      const dirPath = path.resolve(__dirname, `./dist/${directory}/`, rootDir);
      if (rootDir === `${filename}.js`) {
        content.push(`require('../${directory}/${filename}').default`);
      } else {
        if (!fs.statSync(dirPath).isDirectory()) {
          continue;
        }
        if (fs.existsSync(dirPath + `/${filename}.js`)) {
          content.push(
            `require('../${directory}/${rootDir}/${filename}').default`
          );
        }
        const subConfigs = requireLoop(rootDir);
        content = [...content, ...subConfigs];
      }
    }
    return content;
  };
}

function writeRequire(filename, contentStream) {
  const dir = path.resolve(__dirname, './dist/build');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFile(
    path.join(dir, filename),
    'export default [' + contentStream() + ']',
    function(err) {
      if (err) {
        console.log('[fs]', 'writeRequire 檔案寫入失敗！');
        return false;
      }
    }
  );
}

function writeExtensionsRequire() {
  const THESE_DIRECTORIES_COULD_NOT_BEEN_COVER = ['roots', 'store'];

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

  const targetPath = function(extensionsDir) {
    return path.resolve(
      __dirname,
      './dist/core',
      extensionsDir.replace(/\./g, '/')
    );
  };

  const dirs = fs.readdirSync(path.resolve(__dirname, './extensions'));
  for (const i in dirs) {
    const extensionsDir = dirs[i];
    if (THESE_DIRECTORIES_COULD_NOT_BEEN_COVER.includes(extensionsDir)) {
      console.log('這個資料夾不能擴充：' + extensionsDir);
      return false;
    }
    const targetDir = targetPath(extensionsDir);
    if (!fs.existsSync(targetDir)) {
      console.log('請確認資料夾名稱是否正確：' + extensionsDir);
      return false;
    }
    const targetFiles = fs.readdirSync(targetDir);
    const extensionFiles = fs.readdirSync(
      path.resolve(__dirname, './extensions', extensionsDir)
    );
    let content = [];
    if (extensionsDir === 'container')
      content.push(`export { compose } from 'redux';`);

    targetFiles.forEach(function(filename) {
      if (filename === 'index.js') return;
      if (filename.substring(0, 1) === '_') return;
      content.push(
        `export { default as ${fileRename(filename)} } from './${filename}';`
      );
    });
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

    fs.writeFile(
      targetPath(extensionsDir) + `/index.js`,
      content.join('\n'),
      function(err) {
        if (err) {
          console.log('[fs]', 'writeExtensionsRequire 檔案寫入失敗！');
          return false;
        }
      }
    );
  }
}

writeRequire('containers.js', requireFiles('containers', 'config'));
writeExtensionsRequire();
