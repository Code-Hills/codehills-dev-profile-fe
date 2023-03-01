import { IRoute } from '@/interfaces/route.interface';
import NotFoundPage from '@/modules/activities/PageNotFound';

const notFoundRoute: IRoute = {
  title: 'Page Not Found - Codehills',
  protected: false,
  guestOnly: false,
  path: '*',
  component: NotFoundPage,
};

export default notFoundRoute;
