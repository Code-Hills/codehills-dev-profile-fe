import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './LoginActivity.css';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import logo from '../../../img/logo.png';
import mslogo from '../../../img/mslogo.svg';

import { loginUser } from '@/redux/features/auth/loginSlice';

const apiUrl = import.meta.env.VITE_PUBLIC_DEFAULT_API;

const LoginActivity = () => {
  const location = useLocation();
  const dispatch: Dispatch<any> = useDispatch();

  const handleClick = () => {
    window.location.href = `${apiUrl}/api/v1/auth/microsoft`;
  };

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
      if (decoded.status === 200) {
        const { token } = decoded.data;
        dispatch(loginUser(token));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="login">
      <div className="loginLeft">
        <div className="loginHeader">
          <h2>You will never regret to join Codehills</h2>
          <p>
            We&apos;re glad you&apos;re here! Please log in to explore
            all of our features
          </p>
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
            <button
              type="button"
              className="microsoftBtn"
              onClick={handleClick}
            >
              <img src={mslogo} alt="Microsoft Logo" />
              &nbsp; &nbsp;Sign in with Microsoft
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginActivity;
