import { IRoute } from '@/interfaces/route.interface';
import DashboardActivity from '@/modules/activities/DashboardActivity';

const dashboardRoute: IRoute = {
  title: 'Dashboard - Codehills',
  protected: true,
  guestOnly: false,
  path: '/Dashboard',
  component: DashboardActivity,
};

export default dashboardRoute;
