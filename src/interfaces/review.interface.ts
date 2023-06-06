import { IState } from './state.interface';

export interface Review {
  id: string;
  createdAt: string;
  updatedAt: string;
  revieweeId: string;
  reviewCycleId: string;
  description: string;
  ratings: number;
}

export interface IStateWithReviews extends IState {
  reviews: Review[];
}
