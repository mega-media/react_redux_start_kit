import 'babel-polyfill';
import 'es6-promise';
import React from 'react';
import { render } from 'react-dom';
import RouterFormat from './dist/Router';

render(RouterFormat, document.getElementById('container'));
