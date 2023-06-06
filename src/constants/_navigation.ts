import {
  HiHome,
  HiUsers,
  HiCurrencyDollar,
  HiClock,
  HiDocumentReport,
  HiChartBar,
  HiCheckCircle,
} from 'react-icons/hi';
import { GiStarFormation } from 'react-icons/gi';

import { INavigationLink } from '@/interfaces/naviation.interface';

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
