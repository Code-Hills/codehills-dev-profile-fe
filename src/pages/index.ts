import dashboardRoute from './routes/dashboard';
import profileRoute from './routes/profile';
import loginRoute from './routes/login';
import notFoundRoute from './routes/notFoundPage';
import logoutRoute from './routes/logout';
import usersRoute from './routes/users';

const routes = [
  dashboardRoute,
  loginRoute,
  profileRoute,
  logoutRoute,
  notFoundRoute,
  usersRoute,
];

export default routes;
