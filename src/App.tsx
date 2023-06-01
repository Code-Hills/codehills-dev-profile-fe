import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import { useEffect } from 'react';

import privateRoutes from './pages';
import { useAppSelector } from './modules/_partials/hooks/useRedux';
import isAuth from './helpers/isAuth';
import PageNotFound from './modules/activities/PageNotFound';
import LoginActivity from './modules/activities/LoginActivity';
import AppLayout from './modules/_partials/layouts/AppLayout';

const user = isAuth();

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <PageNotFound />,
    element: <AppLayout />,
    loader() {
      if (!user) {
        throw redirect('/login');
      }
      return <div>Loading</div>;
    },
    children: privateRoutes.map(route => ({
      path: route.path,
      element: <route.component />,
    })),
  },
  {
    path: '/login',
    element: <LoginActivity />,
    loader() {
      if (user) {
        throw redirect('/');
      }
      return <div>Loading...</div>;
    },
  },
]);

const App = () => {
  const { theme } = useAppSelector(state => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'system') {
      const systemTheme = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
        ? 'dark'
        : 'light';
      document.documentElement.classList.add(systemTheme);
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return <RouterProvider router={router} />;
};

export default App;
