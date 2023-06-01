import { IRoute } from '@/interfaces/route.interface';
import ReviewCycle from '@/modules/activities/review/ReviewCycle';

const reviewsRoute: IRoute = {
  title: 'Performance - Codehills',
  protected: true,
  guestOnly: false,
  path: '/reviews',
  component: ReviewCycle,
};

export default reviewsRoute;
