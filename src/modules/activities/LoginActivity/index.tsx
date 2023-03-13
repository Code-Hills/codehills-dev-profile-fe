import React, { useEffect } from 'react';
import logo from "../../../img/logo.png";
import './LoginActivity.css';
import mslogo from "../../../img/mslogo.svg"
import { useLocation } from 'react-router-dom';
import { loginUser } from '@/redux/features/auth/loginSlice';
import { Dispatch } from 'redux';

import { useDispatch } from 'react-redux';

const apiUrl = import.meta.env.VITE_PUBLIC_DEFAULT_API;

const LoginActivity: React.FC = () => {
  const location = useLocation();
  const dispatch: Dispatch<any> = useDispatch();

  const handleClick = () => {
    window.location.href = `${apiUrl}/api/v1/auth/microsoft`
  }

  useEffect(() => {
    const pulseToken = localStorage.getItem('pulseToken');
    if (pulseToken) {
      // getProfile();
    }

    const base64encoded = location.search
      .split('&')[0]
      .split('?code=')[1];
    if (base64encoded) {
      const decoded: any = JSON.parse(atob(base64encoded));
      console.log(decoded);
      if (decoded.status === 200) {
        let token: string = decoded.data.token;
        dispatch(loginUser(token));
      }


    }
  }, [])
  return (
    <section className="login">
      <div className="loginLeft">
        <div className="loginHeader">
          <h2>You will never regret to join Codehills</h2>
          <p>We're glad you're here! Please log in to explore all of our features</p>
        </div>
      </div>
      <div className="loginRight">
        <div className="righDdata">
          <div className="imgContainer">
            <img src={logo} alt="Logo" />
          </div>
          <div className="loginwelcome">
            <h2>Welcome</h2>
          </div>
          <div>


            <button className="microsoftBtn" onClick={handleClick}>
              <img src={mslogo} alt="Microsoft Logo" />
              &nbsp; &nbsp;Sign in with Microsoft</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginActivity;
