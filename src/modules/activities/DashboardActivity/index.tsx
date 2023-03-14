import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import {
  logoutFromMicrosoft
} from '@/redux/features/auth/loginSlice';
import { fetchProfile } from '@/redux/features/auth/fetchProfileSlie';
import Secure from '@/utils/secureLs';

const DashboardActivity = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const handleLogout = () => {
    Secure.removeToken();
    window.location.href = "/login";
    // dispatch(logoutFromMicrosoft());
    // localStorage.removeItem('pulseToken');
  };

  const handleGetProfile =()=>{
    dispatch(fetchProfile());
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
