import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './LoginActivity.css';

import logo from '../../../img/logo.png';
import mslogo from '../../../img/mslogo.svg';

import Secure from '@/utils/secureLs';
import Keys from '@/utils/keys';

const apiUrl = Keys.DEFAULT_API;

const LoginActivity = () => {
  const location = useLocation();

  const handleClick = () => {
    window.location.href = `${apiUrl}/api/v1/auth/microsoft`;
  };

  useEffect(() => {
    const pulseToken = Secure.getToken();
    if (pulseToken) { 
      window.location.href = '/dashboard';
    }

    const base64encoded = location.search
      .split('&')[0]
      .split('?code=')[1];
      if (base64encoded) {
        const decoded: any = JSON.parse(atob(base64encoded));
      if (decoded.status === 200) {
        const { token } = decoded.data;
        Secure.setToken(token);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="h-screen grid md:grid-cols-2">
      <div className="loginLeft hidden md:block bg-center bg-no-repeat bg-cover relative">
        <div className="flex items-center text-center justify-center flex-col mt-16">
          <h2 className="font-medium text-2xl leading-10 text-gray-700 uppercase pb-8">
            You will never regret to join Codehills
          </h2>
          <p className="second-text">
            We&apos;re glad you&apos;re here! Please log in to explore
            all of our features
          </p>
        </div>
      </div>
      <div className="loginRight flex justify-center pt-20 bg-no-repeat bg-center relative">
        <div className="righDdata flex flex-col items-center">
          <div className="h-40 w-40">
            <img
              src={logo}
              className="rounded-full filter opacity-50 drop-shadow-gray-200"
              alt="Logo"
            />
          </div>
          <div className="loginwelcome">
            <h2 className="uppercase text-center mt-8 mb-8 text-gray-600 leading-40 text-2xl font-semibold">
              Welcome
            </h2>
          </div>
          <div>
            <button
              type="button"
              className="microsoftBtn flex bg-gray-50 rounded-lg px-4 py-2 text-base"
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
