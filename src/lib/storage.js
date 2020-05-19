const LS = window.localStorage;
const LSS = window.sessionStorage;

export default {
  get(key) {
    return LS.getItem(key);
  },
  set(key, value) {
    return LS.setItem(key, value);
  },
  remove(key) {
    return LS.removeItem(key);
  },
  sGet(key) {
    return LSS.getItem(key);
  },
  sSet(key, value) {
    return LSS.setItem(key, value);
  },
};
