import { IState } from './state.interface';
import { User } from './user.interface';

export type ReviewType =
  | 'self review'
  | 'manager review'
  | 'peer review';
export interface Review {
  id: string;
  createdAt: string;
  updatedAt: string;
  revieweeId: string;
  reviewCycleId: string;
  comment: string;
  fieldReviews: any[];
  reviewee?: Partial<User>;
  reviewer?: Partial<User>;
  type?: ReviewType;
}

export interface IStateWithReviews extends IState {
  reviews: Review[];
  developerReviews: Review[];
}

export interface IReviewer {
  reviewerId: string;
  reviewCycleId: string;
  reviewer?: Partial<User>;
  developer?: Partial<User>;
  id?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export interface IStateWithReviewers extends IState {
  reviewers: IReviewer[];
  isMadeSelfReview: boolean;
}
