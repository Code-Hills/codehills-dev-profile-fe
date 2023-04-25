import { Navigate } from 'react-router-dom';

import LoginActivity from './modules/activities/LoginActivity';
import isAuth from './helpers/isAuth';
import { IRoute } from './interfaces/route.interface';
import Secure from './utils/secureLs';
import Keys from './utils/keys';

const defaultRoute: IRoute = {
  title: 'Login - Codehills',
  protected: false,
  guestOnly: false,
  path: '/',
  component: LoginActivity,
};

const AppElement = ({ route = defaultRoute }: { route: IRoute }) => {
  const excludes = ['/'];
  const user = isAuth();

  /** * @Protected routes */
  if (route.protected && !user) {
    Secure.set(Keys.REDIRECT_URL_KEY, route.path);
    return <Navigate to="/" />;
  }
  if (excludes.includes(route.path) && user) {
    const redirectUrl = Secure.get(Keys.REDIRECT_URL_KEY);
    if (redirectUrl) {
      Secure.remove(Keys.REDIRECT_URL_KEY);
      return <Navigate to={redirectUrl} replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  if (route.title) {
    document.title = route.title;
  }

  return <route.component />;
};

export default AppElement;
