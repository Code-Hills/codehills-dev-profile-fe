import { IRoute } from '@/interfaces/route.interface';
import LoginActivity from '@/modules/activities/LoginActivity';

const loginRoute: IRoute = {
  title: 'Login - Codehills',
  protected: false,
  guestOnly: true,
  path: '/',
  component: LoginActivity,
};

export default loginRoute;
