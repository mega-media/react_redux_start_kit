import View from './view';

export default {
  router: {
    path: '/hello',
    component: View
  }
};

/**
 * config.js 是 container 的設定檔，在此設定該 container 的路徑以及對應檔案
 * 專案建置時系統會掃描所有 containers 的 config.js 進行合併
 *
 * router
 * @param path [路徑，需以 / 為開頭]
 * @param component [畫面]
 *
 * 當頁面為多筆時，使用陣列格式
 * ex.
 * router: [{
 *   path: '/demo',
 *   component: Demo
 * }, {
 *   path: '/demo/:id',
 *   component: DemoSub
 * }]
 *
 */
