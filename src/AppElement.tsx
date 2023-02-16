import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginActivity from './modules/activities/LoginActivity';
import isAuth from './helpers/isAuth';
import { IRoute } from './interfaces/route.interface';

const defaultRoute: IRoute = {
  title: 'Login - Codehills',
  protected: false,
  guestOnly: false,
  path: '/login',
  component: LoginActivity,
};

const AppElement = ({ route = defaultRoute }: { route: IRoute }) => {
  const excludes = ['/', '/login'];
  const navigate = useNavigate();
  const changePage = useRef(() => {});

  if (route.title) {
    document.title = route.title;
  }

  changePage.current = async () => {
    const user = await isAuth();
    if (route.guestOnly && user) {
      navigate('/');
    }

    /** * @Protected - session rounting config */
    if (route.protected && !user) {
      navigate('/');
    }
    if (excludes.includes(route.path) && user) {
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    if (route) {
      changePage.current();
    }
  }, [route]);

  return <route.component />;
};

export default AppElement;
