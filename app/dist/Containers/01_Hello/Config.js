/**
 * Created by arShown on 2016/10/13.
 */
import View from './View';

export default {
    router: {
        path: 'welcome',
        component: View
    }
};

/**
 * Config.js 是 Container 的設定檔，在此設定該 Container 的路徑以及對應檔案
 * 專案打包時系統會掃描所有 Containers 的 Config.js 進行合併
 *
 * 關於 router 可使用的語法請參閱：
 * https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md#configuration-with-plain-routes
 */