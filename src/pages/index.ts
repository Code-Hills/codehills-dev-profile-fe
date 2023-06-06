import dashboardRoute from './routes/dashboard';
import profileRoute from './routes/profile';
import logoutRoute from './routes/logout';
import usersRoute from './routes/users';
import reviewsRoute from './routes/reviews';
import reportsRoute from './routes/reports';
import receivedReviewsRoute from './routes/receivedReviews';
import forbiddenRoute from './routes/forbidden';
import notFoundRoute from './routes/notFound';

const privateRoutes = [
  dashboardRoute,
  profileRoute,
  logoutRoute,
  reviewsRoute,
  reportsRoute,
  receivedReviewsRoute,
  usersRoute,
  forbiddenRoute,
  notFoundRoute,
];

export default privateRoutes;
