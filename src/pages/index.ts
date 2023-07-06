import dashboardRoute from './routes/dashboard';
import profileRoute from './routes/profile';
import logoutRoute from './routes/logout';
import usersRoute from './routes/users';
import reviewsRoute from './routes/reviews';
import reportsRoute from './routes/reports';
import receivedReviewsRoute from './routes/receivedReviews';
import forbiddenRoute from './routes/forbidden';
import notFoundRoute from './routes/notFound';
import projectsRoute from './routes/projects';
import addProjectRoute from './routes/addProject';
import singleProjectRoute from './routes/singleProject';

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
  projectsRoute,
  singleProjectRoute,
  addProjectRoute,
];

export default privateRoutes;
