import { IRoute } from '@/interfaces/route.interface';
import AddProject from '@/modules/activities/Projects/AddProjectWrapper';

const projectsRoute: IRoute = {
  title: 'Add project - Codehills',
  protected: true,
  guestOnly: false,
  path: '/projects/new',
  component: AddProject,
};

export default projectsRoute;
