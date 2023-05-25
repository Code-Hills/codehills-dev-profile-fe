import { IRoute } from '@/interfaces/route.interface';
import ReceivedReviews from '@/modules/activities/review/ReceivedReviews';

const receivedReviewsRoute: IRoute = {
  title: 'My Received Reviews - Codehills',
  protected: false,
  guestOnly: false,
  path: '/reviews/received',
  component: ReceivedReviews,
};

export default receivedReviewsRoute;
