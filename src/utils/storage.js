const canIUseStorage = !!window.sessionStorage;

export const setStorage = (key, data) => {
  if (canIUseStorage) {
    sessionStorage.setItem(key, data);
  } else {
    document.cookie = `${key}=${data}; path=/;`;
  }
};

export const getStorage = (key) => {
  if (canIUseStorage) {
    return sessionStorage.getItem(key);
  }
  const matched = document.cookie.match(new RegExp(`${key}=([^;]+)(;|$)`));
  return matched ? matched[1] : null;
};
