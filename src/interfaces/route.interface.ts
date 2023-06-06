import { Role } from './user.interface';

export interface IRoute {
  title?: string;
  protected?: boolean;
  guestOnly?: boolean;
  path: string;
  allowedRoles?: Role[];
  component: (props?: any) => JSX.Element;
}
