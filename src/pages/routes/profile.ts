import { IRoute } from '@/interfaces/route.interface';
import ProfileActivity from '@/modules/activities/profile/ProfileActivity';

const profileRoute: IRoute = {
  title: 'My Profile - Codehills',
  protected: true,
  guestOnly: false,
  path: '/profile',
  component: ProfileActivity,
};

export default profileRoute;
