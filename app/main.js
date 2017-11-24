import React from 'react';
import { render } from 'react-dom';
import router from '~/core/router';
// Intro
import IntroView from '~/containers/00_Intro/view';

render(
  router({
    master_component: IntroView,
    router_index: '/welcome'
  }),
  document.getElementById('container')
);
