import {
  HiHome,
  HiUsers,
  HiCurrencyDollar,
  HiClock,
  HiDocumentReport,
  HiChartBar,
  HiCheckCircle,
} from 'react-icons/hi';

export const sidebarNavLinks = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: HiHome,
  },
  {
    name: 'Users',
    href: '/users',
    icon: HiUsers,
  },
  {
    name: 'Performance',
    href: '/dashboard/performance',
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
    href: '/dashboard/reports',
    icon: HiDocumentReport,
  },
];
