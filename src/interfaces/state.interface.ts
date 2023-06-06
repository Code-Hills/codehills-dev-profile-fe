import { Cycle } from './cycle.interface';
import { User } from './user.interface';

export interface IState {
  loading: boolean;
  error: string | null;
}

export interface IStateWithUsers extends IState {
  users: User[];
}

export interface IStateWithUser extends IState {
  user: User | null;
}

export interface IStateWithCycles extends IState {
  cycles: Cycle[];
  activeCycle: Cycle | null;
}
