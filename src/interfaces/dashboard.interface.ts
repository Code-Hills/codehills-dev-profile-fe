import { IProject } from './project.interface';

export interface IDashboard {
  recentProjects: IProject[];
  totalDevelopers: number;
  totalProjects: number;
  totalReceivedReviews: number;
  totalReviews: number;
  totalReviewCycle: number;
}
