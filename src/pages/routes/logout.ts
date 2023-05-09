import { IRoute } from '@/interfaces/route.interface';
import LogoutPage from '@/modules/activities/logout/LogoutPage';

const logoutRoute: IRoute = {
  title: 'Logout - Codehills',
  protected: true,
  guestOnly: false,
  path: '/logout',
  component: LogoutPage,
};

export default logoutRoute;
