/**
 * 這個設定檔是給開發者用的
 */

/* 專案名稱 */
module.exports.PROJECT_NAME = 'React Redux Start Kit';

/* 專案環境 */
module.exports.PROJECT_HOST = '127.0.0.1';
module.exports.PROJECT_PORT = 8888;

/* app/assets/ 下要引入的共用資源資料夾，withStyle 預設樣式，使用逗號區隔 */
module.exports.INCLUDE_ASSETS = 'css';

/**
 * app/src/ 下要壓縮的設定，取代原本 config.js 的設定
 * 輸出格式為：{ [name]: Array }
 * 注意：當檔名為底線(_)開頭，該檔案會被忽略
 * ---
 * name: 輸出鍵值
 * path?: 路徑，若路徑只有一筆時使用，與 paths 同時存在時會被忽略
 * paths?: 路徑資料陣列，若路徑多筆時使用
 */
module.exports.BUILD_COMBINE = [
  {
    name: 'epic',
    path: 'storage/epics/'
  }
];

/* 是否啟用 redux-devtools */
module.exports.ENABLE_DEV_TOOLS = true;
