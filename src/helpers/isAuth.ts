// const isAuth: any = () => {
//   try {
//     return localStorage.getItem('pulseToken');
//   } catch (error) {
//     return false;
//   }
// };

// export default isAuth;

import jwtDecode from 'jwt-decode';

import Secure from '@/utils/secureLs';

const isAuth: any = (token: string = Secure.getToken()) => {
  try {
    const jwt: { exp: number } = jwtDecode(token);
    const now = new Date();
    if (now.getTime() > jwt.exp * 1000) {
      Secure.removeToken();
      return false;
    }
    return jwtDecode(token);
  } catch (error) {
    return false;
  }
};

export default isAuth;
