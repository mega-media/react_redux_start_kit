import 'babel-polyfill';
import 'es6-promise';
import React from 'react';
import { render } from 'react-dom';
import routerFormat from './dist/router';

render(routerFormat, document.getElementById('container'));
