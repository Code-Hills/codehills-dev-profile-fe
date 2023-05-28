import { IRoute } from '@/interfaces/route.interface';
import UsersActivity from '@/modules/activities/AdminDashboard/UsersActivity';

const usersRoute: IRoute = {
  title: 'Admin - users',
  protected: false,
  guestOnly: true,
  path: 'dashboard/users',
  component: UsersActivity,
};

export default usersRoute;
