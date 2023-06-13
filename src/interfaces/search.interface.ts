import { User } from './user.interface';

export interface IStateWithSearch {
  loading: boolean;
  error: string | null;
  searchUserResults: User[];
}
