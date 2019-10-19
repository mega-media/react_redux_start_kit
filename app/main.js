import React from 'react';
import { render } from 'react-dom';
import router from '@core/router';
/* highlight style */
import 'highlight.js/scss/railscasts.scss';

render(
  router({
    /* 預設語系，預設為 zh_tw */
    i18nInit: CONFIG.LOCALE.LANGUAGE_INIT,

    /* 未翻譯文字的顯示語言，預設為 en */
    i18nFallback: CONFIG.LOCALE.LANGUAGE_FALLBACK,

    /* 預設頁面路徑 */
    routerIndex: '/intro',

    /* 找不到路由時候的導向路徑 */
    routerNotFound: null,

    /* 路由要處理的 middleware */
    routerMiddleware: null,

    /* reducer middleware */
    reducerMiddleware: reducer => (state, action) => reducer(state, action)
  }),
  document.getElementById('container')
);
