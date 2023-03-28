import React from 'react';
import { Sidebar, DarkThemeToggle } from 'flowbite-react';
import {
  HiHome,
  HiUsers,
  HiCurrencyDollar,
  HiClock,
  HiDocumentReport,
  HiChartBar,
  HiCheckCircle,
} from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

import logo from '@/assets/images/logos/logo.svg';

const navLinks = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: HiHome,
  },
  {
    name: 'Users',
    href: '/dashboard/users',
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

const AppSidebar = ({ className = 'w-fit' }) => {
  return (
    <div className={className}>
      <Sidebar aria-label="Sidebar with logo branding example">
        <Sidebar.Logo href="#" img={logo} imgAlt="Flowbite logo">
          CodeHills
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {navLinks.map(link => (
              <NavLink key={link.name} to={link.href}>
                <Sidebar.Item href="#" icon={link.icon}>
                  {link.name}
                </Sidebar.Item>
              </NavLink>
            ))}
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup>
            <div className="relative flex items-center w-full">
              <DarkThemeToggle about="Dark mode" title="Dark Mode" />
              <p className="left-10 text-gray-500 dark:text-gray-400 absolute pointer-events-none">
                Dark mode
              </p>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default AppSidebar;
