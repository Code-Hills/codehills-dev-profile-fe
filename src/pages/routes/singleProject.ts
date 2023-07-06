import { IRoute } from '@/interfaces/route.interface';
import SingleProject from '@/modules/activities/SingleProject';

const singleProjectRoute: IRoute = {
  title: 'Projects - Codehills',
  protected: false,
  guestOnly: false,
  path: '/projects/:projectId',
  component: SingleProject,
};

export default singleProjectRoute;
