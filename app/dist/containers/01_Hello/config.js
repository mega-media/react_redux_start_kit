import view from './view';

export default {
  router: {
    path: 'welcome',
    component: view
  }
};

/**
 * Config.js 是 Container 的設定檔，在此設定該 Container 的路徑以及對應檔案
 * 專案建置時系統會掃描所有 Containers 的 Config.js 進行合併
 *
 * 關於 router 可使用的語法請參閱：
 * https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md#configuration-with-plain-routes
 */
