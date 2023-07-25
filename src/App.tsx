import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import privateRoutes from './pages';
import { useAppSelector } from './modules/_partials/hooks/useRedux';
import isAuth from './helpers/isAuth';
import ErrorPage from './modules/activities/ErrorPage';
import LoginActivity from './modules/activities/LoginActivity';
import AppLayout from './modules/_partials/layouts/AppLayout';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginActivity />,
    loader() {
      if (isAuth()) {
        throw redirect('/');
      }
      return <div>Loading...</div>;
    },
  },
  {
    path: '/',
    errorElement: <ErrorPage errorCode={500} />,
    element: <AppLayout />,
    children: privateRoutes.map(route => ({
      path: route.path,
      element: <route.component />,
      loader() {
        if (!isAuth()) {
          throw redirect('/login');
        }
        const { allowedRoles = [] } = route;
        if (
          allowedRoles.length &&
          !allowedRoles?.includes(isAuth().role)
        ) {
          throw redirect('/forbidden');
        }
        return <div>Loading...</div>;
      },
    })),
  },
]);

const App = () => {
  const { theme } = useAppSelector(state => state.theme);

  useLayoutEffect(() => {
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

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer theme={theme === 'dark' ? 'dark' : 'light'} />
    </>
  );
};

export default App;
