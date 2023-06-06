import { IRoute } from '@/interfaces/route.interface';
import ForbiddenPage from '@/modules/activities/ErrorPage/ForbiddenPage';

const forbiddenRoute: IRoute = {
  title: 'Forbidden - Codehills',
  protected: true,
  guestOnly: false,
  path: '/forbidden',
  component: ForbiddenPage,
};

export default forbiddenRoute;
