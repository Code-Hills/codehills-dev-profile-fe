import { Link, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import Secure from '@/utils/secureLs';
import { logoutFromMicrosoft } from '@/redux/features/auth/loginSlice';
import DashboardLayout from '@/modules/_partials/layouts/DashboardLayout';

const DashboardActivity = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const handleLogout = (e: any) => {
    e.preventDefault();
    Secure.removeToken();
    dispatch(logoutFromMicrosoft);
    navigate('/');
  };

  const handleGetProfile = () => {
    // dispatch(fetchProfile());
  };
  return (
    <DashboardLayout>
      <h1 className="text-center p-4 text-2xl md:text-4xl text-blue-800 dark:text-brand-blue-light">
        Codehills
      </h1>
    </DashboardLayout>
  );
};

export default DashboardActivity;
