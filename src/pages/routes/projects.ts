import { IRoute } from '@/interfaces/route.interface';
import Projects from '@/modules/activities/Projects';

const projectsRoute: IRoute = {
  title: 'Projects - Codehills',
  protected: true,
  guestOnly: false,
  path: '/projects',
  component: Projects,
};

export default projectsRoute;
