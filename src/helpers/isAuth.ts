const isAuth: any = () => {
  try {
    return localStorage.getItem('pulseToken');
  } catch (error) {
    return false;
  }
};

export default isAuth;
