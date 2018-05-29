import { ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';
import { PING, PONG } from './constant';

export const pingEpic = action$ =>
  action$.pipe(ofType(PING), delay(1000), mapTo({ type: PONG }));
