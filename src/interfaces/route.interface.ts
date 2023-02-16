import { ReactNode } from 'react';

export interface IRoute {
  title?: string;
  protected?: boolean;
  guestOnly?: boolean;
  path: string;
  component: () => JSX.Element;
}
