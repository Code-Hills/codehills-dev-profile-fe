export interface IProject {
  id: string;
  startDate: string;
  endDate: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'canceled';
}
