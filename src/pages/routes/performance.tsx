import { IRoute } from '@/interfaces/route.interface';
import ReceivedReviews from '@/modules/activities/review/ReceivedReviews';

const performanceRoute: IRoute = {
  title: 'Performance - Codehills',
  protected: true,
  guestOnly: false,
  path: '/performance',
  component: ReceivedReviews,
  allowedRoles: ['developer', 'architect'],
};

export default performanceRoute;
