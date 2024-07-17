import { IRoute } from '@/interfaces/route.interface';
import Ratings from '@/modules/activities/Ratings/ratings';

const ratingRoute: IRoute = {
  title: 'Ratings - Codehills',
  protected: true,
  guestOnly: false,
  path: '/ratings',
  allowedRoles: ['admin'],
  component: Ratings,
};

export default ratingRoute;
