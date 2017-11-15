export function lock() {
  return {
    type: 'SAGA_LOCK'
  };
}

export function unlock() {
  return {
    type: 'SAGA_UNLOCK'
  };
}
