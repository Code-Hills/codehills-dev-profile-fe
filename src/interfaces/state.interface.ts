import { Cycle } from './cycle.interface';
import { Ratings } from './rating.interface';
import { RatingFields } from './ratingFields.interface';
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

export interface IStateWithRatings extends IState {
  name: Ratings[];
}

export interface IStateWithRatingFields extends IState {
  ratingFields: RatingFields[];
}
