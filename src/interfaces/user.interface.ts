export type Role = 'developer' | 'manager' | 'architect' | 'admin';

export interface User {
  id: any;
  displayName: string;
  role: Role;
  email: string;
  isActivated: boolean;
  users: User[];
}
