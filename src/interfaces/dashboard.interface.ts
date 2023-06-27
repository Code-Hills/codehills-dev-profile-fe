import { IProject } from './project.interface';
import { IState } from './state.interface';

export interface IDashboard {
  recentProjects: IProject[];
  totalDevelopers: number;
  totalProjects: number;
  totalReceivedReviews: number;
  totalReviews: number;
  totalReviewCycle: number;
}

export interface IStateWithDashboard extends IState {
  dashboard: IDashboard;
}
