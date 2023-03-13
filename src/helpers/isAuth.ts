
const isAuth: any = () => {
  try {
    const pulseToken = localStorage.getItem('pulseToken');
    return pulseToken;
  } catch (error) {
    return false;
  }
};

export default isAuth;
