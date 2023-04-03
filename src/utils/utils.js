/**
 * 设置storage
 * @param value
 */
export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获取storage
 * @param value
 */
export const getStorage = (key) => {
  const temp = localStorage.getItem(key);
  if (temp === null || typeof temp === 'undefined') return null;
  return JSON.parse(temp);
};

/**
 * 移除storage
 * @param value
 */
export const clearStorage = (key) => {
  localStorage.removeItem(key);
};

/**
 * 设置sessionstorage
 * @param value
 */
export const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获取sessionstorage
 * @param value
 */
export const getSessionStorage = (key) => {
  const temp = sessionStorage.getItem(key);
  if (temp === null || typeof temp === 'undefined') return null;
  return JSON.parse(temp);
};

/**
 * 移除sessionstorage
 * @param value
 */
export const clearSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};

/**
 * 判断是否为PC端
 * @param value
 */
export const isPC = () => {
  return !/Android|webOS|iPhone|iPod|BlackBerry|SymbianOS|iPad|Windows Phone/i.test(
    navigator.userAgent,
  );
};
