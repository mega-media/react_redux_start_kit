/* 專案名稱 */
const PROJECT_NAME = 'React Redux Start Kit';

/* 專案環境 */
const PROJECT_HOST = '0.0.0.0';
const PROJECT_PORT = 80;

/* 路由根目錄 */
const ROUTE_BASE = '/startkit/';

/* 要引入的共用資源，withStyle 預設樣式 */
const INCLUDE_ASSETS = 'css';

/* 要打包config.js的資料夾，使用逗號區隔 */
const BUILD_DIRECTORIES = 'containers';

/* 是否啟用 redux-devtools */
const ENABLE_DEV_TOOLS = false;

module.exports = {
  PROJECT_NAME,
  PROJECT_HOST,
  PROJECT_PORT,
  ROUTE_BASE,
  INCLUDE_ASSETS,
  BUILD_DIRECTORIES,
  ENABLE_DEV_TOOLS
};
