import { IRoute } from '@/interfaces/route.interface';
import PageNotFound from '@/modules/activities/ErrorPage';

const notFoundRoute: IRoute = {
  title: '404 - Codehills',
  protected: true,
  guestOnly: false,
  path: '*',
  component: PageNotFound,
};

export default notFoundRoute;
