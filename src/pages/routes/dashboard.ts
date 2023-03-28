import { IRoute } from '@/interfaces/route.interface';
import DashboardActivity from '@/modules/activities/DashboardActivity';

const dashboardRoute: IRoute = {
  title: 'Dashboard - Codehills',
  protected: false,
  guestOnly: false,
  path: '/dashboard',
  component: DashboardActivity,
};

export default dashboardRoute;
