import dashboardRoute from './routes/dashboard';
import profileRoute from './routes/profile';
import loginRoute from './routes/login';
import notFoundRoute from './routes/notFoundPage';
import logoutRoute from './routes/logout';
import usersRoute from './routes/users';
import reviewsRoute from './routes/reviews';
import reportsRoute from './routes/reports';
import receivedReviewsRoute from './routes/receivedReviews';

const routes = [
  dashboardRoute,
  loginRoute,
  profileRoute,
  logoutRoute,
  reviewsRoute,
  reportsRoute,
  receivedReviewsRoute,
  notFoundRoute,
  usersRoute,
];

export default routes;
