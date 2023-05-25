import { IRoute } from '@/interfaces/route.interface';
import ReviewCycle from '@/modules/activities/review/ReviewCycle';

const reviewsRoute: IRoute = {
  title: 'Performance - Codehills',
  protected: false,
  guestOnly: false,
  path: '/reviews',
  component: ReviewCycle,
};

export default reviewsRoute;
