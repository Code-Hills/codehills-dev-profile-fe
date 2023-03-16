import { Link } from 'react-router-dom';
import Secure from '@/utils/secureLs';
import { logoutFromMicrosoft } from '@/redux/features/auth/loginSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const DashboardActivity = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const handleLogout = () => {
    Secure.removeToken();
    dispatch(logoutFromMicrosoft);
    window.location.href = "/";
  };

  const handleGetProfile =()=>{
    // dispatch(fetchProfile());
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-2xl md:text-4xl text-blue-800">
        Codehills
      </h1>
      <Link onClick={() => handleLogout()} to="/">
        Sign Out
      </Link>
      <button type="button" onClick={handleGetProfile}>
        Profile
      </button>
    </div>
  );
};

export default DashboardActivity;
