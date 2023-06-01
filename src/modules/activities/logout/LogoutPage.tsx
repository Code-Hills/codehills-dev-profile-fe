import { useEffect } from 'react';

import { useAppDispatch } from '@/modules/_partials/hooks/useRedux';
import { logoutFromMicrosoft } from '@/redux/features/auth/loginSlice';
import isAuth from '@/helpers/isAuth';

const LogoutPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isAuth()) {
      dispatch(logoutFromMicrosoft());
    } else {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <p>Logout....</p>
    </div>
  );
};

export default LogoutPage;
