import SecureLS from 'secure-ls';

import Keys from './keys';

const set = (key: string, value: any) => {
  if (Keys.ISSERVER) return;
  const ls = new SecureLS({ encodingType: 'aes' });
  ls.set(key, value);
};

const get = (key: string) => {
  if (Keys.ISSERVER) return null;
  const ls = new SecureLS({ encodingType: 'aes' });
  return ls.get(key);
};

const remove = (key: string) => {
  if (Keys.ISSERVER) return null;
  const ls = new SecureLS({ encodingType: 'aes' });
  return ls.remove(key);
};

const removeToken = () => {
  if (Keys.ISSERVER) return null;
  const ls = new SecureLS({ encodingType: 'aes' });
  return ls.remove(`${Keys.REACT_APP_ACCESS_TOKEN}`);
};

const setToken = (value: any) => {
  if (Keys.ISSERVER) return;
  const ls = new SecureLS({ encodingType: 'aes' });
  ls.set(`${Keys.REACT_APP_ACCESS_TOKEN}`, value);
};

const getToken = () => {
  if (Keys.ISSERVER) return null;
  const ls = new SecureLS({ encodingType: 'aes' });
  try {
    return ls.get(`${Keys.REACT_APP_ACCESS_TOKEN}`) || null;
  } catch (error) {
    return null;
  }
};

const Secure = {
  set,
  setToken,
  get,
  getToken,
  remove,
  removeToken,
};

export default Secure;
