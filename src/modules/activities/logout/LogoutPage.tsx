import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch } from '@/modules/_partials/hooks/useRedux';
import { logoutFromMicrosoft } from '@/redux/features/auth/loginSlice';

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    dispatch(logoutFromMicrosoft(navigate));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <p>Logout....</p>
    </div>
  );
};

export default LogoutPage;
