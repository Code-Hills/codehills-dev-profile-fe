import {
  HiHome,
  HiUsers,
  HiCurrencyDollar,
  HiClock,
  HiDocumentReport,
  HiChartBar,
  HiCheckCircle,
  HiViewGrid,
} from 'react-icons/hi';
import { GiStarFormation } from 'react-icons/gi';

import { INavigationLink } from '@/interfaces/navigation.interface';

export const sidebarNavLinks: INavigationLink[] = [
  {
    name: 'Home',
    href: '/',
    icon: HiHome,
  },
  {
    name: 'Users',
    href: '/users',
    icon: HiUsers,
    allowedRoles: ['admin'],
  },
  {
    name: 'Reviews',
    href: '/reviews',
    icon: GiStarFormation,
  },
  {
    name: 'Performance',
    href: '/performance',
    icon: HiChartBar,
  },
  {
    name: 'Goals',
    href: '/dashboard/goals',
    icon: HiCheckCircle,
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: HiViewGrid,
    allowedRoles: ['admin'],
  },
  {
    name: 'Payroll',
    href: '/dashboard/payroll',
    icon: HiCurrencyDollar,
  },
  {
    name: 'Time tracker',
    href: '/dashboard/time-tracker',
    icon: HiClock,
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: HiDocumentReport,
    allowedRoles: ['admin'],
  },
];
