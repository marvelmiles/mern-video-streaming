export const debounce = (func, timeout = 1000) => {
  let timer;
  clearTimeout(timer);
  timer = setTimeout(() => {
    func.apply(this);
  }, timeout);
};

export const isTouchDevice = () =>
  window.matchMedia("(pointer: coarse)").matches ||
  window.ontouchstart !== undefined;
