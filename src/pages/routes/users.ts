import { IRoute } from '@/interfaces/route.interface';
import UsersActivity from '@/modules/activities/AdminDashboard/UsersActivity';

const usersRoute: IRoute = {
  title: 'Admin - users',
  protected: true,
  guestOnly: false,
  path: '/users',
  component: UsersActivity,
};

export default usersRoute;
