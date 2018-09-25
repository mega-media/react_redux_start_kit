/** @flow
 * setTimeout setInterval 替代方案：使用 requestAnimationFrame
 */
const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  false;
const cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame || false;

/**
 * 同 setInterval
 * @param callback {function} [行為]
 * @param interval {number} [延遲時間]
 * @return {*}
 */
export const requestInterval = (callback: () => any, interval: number) => {
  let request = {};

  if (!requestAnimationFrame || !cancelAnimationFrame) {
    request.id = setInterval(callback, interval);
    request.clear = () => clearInterval(request.id);
    return request;
  }

  let start = new Date().getTime();

  function loop() {
    request.id = requestAnimationFrame(loop);
    const current = new Date().getTime();
    if (current - start >= interval) {
      callback.call();
      start = new Date().getTime();
    }
  }
  request.id = requestAnimationFrame(loop);
  request.clear = () => cancelAnimationFrame(request.id);

  return request;
};

/**
 * 同 setTimeout
 * @param callback {function} [行為]
 * @param delay {number} [延遲時間]
 * @return {*}
 */
export const requestTimeout = (callback: () => any, delay: number) => {
  let request = {};

  if (!requestAnimationFrame || !cancelAnimationFrame) {
    request.id = setTimeout(callback, delay);
    request.clear = () => clearTimeout(request.id);
    return request;
  }

  const start = new Date().getTime();

  function loop() {
    request.id = requestAnimationFrame(loop);
    const current = new Date().getTime();
    if (current - start >= delay) {
      callback.call();
      cancelAnimationFrame(request.id);
    }
  }
  request.id = requestAnimationFrame(loop);
  request.clear = () => cancelAnimationFrame(request.id);

  return request;
};
