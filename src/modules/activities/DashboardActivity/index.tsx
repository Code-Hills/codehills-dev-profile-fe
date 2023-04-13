import { Link, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import Secure from '@/utils/secureLs';
import { logoutFromMicrosoft } from '@/redux/features/auth/loginSlice';

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
    <div className="flex flex-col items-center">
      <h1 className="text-center text-2xl md:text-4xl text-blue-800">
        Codehills
      </h1>
      <Link onClick={e => handleLogout(e)} to="/">
        Sign Out
      </Link>
      <button type="button" onClick={handleGetProfile}>
        Profile
      </button>
    </div>
  );
};

export default DashboardActivity;
