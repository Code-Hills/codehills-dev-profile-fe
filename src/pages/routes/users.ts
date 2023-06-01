import { IRoute } from '@/interfaces/route.interface';
import UsersActivity from '@/modules/activities/AdminDashboard/UsersActivity';

const usersRoute: IRoute = {
  title: 'Users - Codehills',
  protected: true,
  guestOnly: false,
  path: '/users',
  component: UsersActivity,
};

export default usersRoute;
