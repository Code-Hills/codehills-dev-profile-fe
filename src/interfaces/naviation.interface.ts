import { Role } from './user.interface';

export interface INavigationLink {
  name: string;
  href: string;
  icon: any;
  allowedRoles?: Role[];
}
