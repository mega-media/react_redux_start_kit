import { delay, mapTo } from 'rxjs/operators';

export const pingEpic = action$ =>
  action$.ofType('PING').pipe(
    delay(1000),
    mapTo({ type: 'PONG' })
  );

export default [pingEpic];
