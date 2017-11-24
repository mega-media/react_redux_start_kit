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

writeRequire('containers.js', requireFiles('containers', 'config'));
