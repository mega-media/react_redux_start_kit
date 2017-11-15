/* @flow */
import async from './watcher/async/action';
import { cancel as c, cancelLatest as cl } from './watcher/cancel/action';
import d from './watcher/delay/action';
import { lock as l, unlock as ul } from './watcher/lock/action';
import p from './watcher/polling/action';

export const fetch = async;
export const cancel = c;
export const cancelLatest = cl;
export const delay = d;
export const lock = l;
export const unlock = ul;
export const polling = p;
