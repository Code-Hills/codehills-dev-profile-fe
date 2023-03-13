import {  logoutFromMicrosoft, logoutSuccess } from '@/redux/features/auth/loginSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

const DashboardActivity = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const handleLogout=()=>{
    dispatch(logoutFromMicrosoft());
    localStorage.removeItem('pulseToken');
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-2xl md:text-4xl text-blue-800">
        Codehills
      </h1>
      <Link
                onClick={() => handleLogout()}
                to="/"
              >
                Sign Out
              </Link>
      <button type='button' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardActivity;
