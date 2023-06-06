import { IRoute } from '@/interfaces/route.interface';
import PerformanceReport from '@/modules/activities/report/PerformanceReport';

const reportsRoute: IRoute = {
  title: 'Performance Report - Codehills',
  protected: true,
  guestOnly: false,
  path: '/reports',
  allowedRoles: ['admin'],
  component: PerformanceReport,
};

export default reportsRoute;
