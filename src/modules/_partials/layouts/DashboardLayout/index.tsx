import React from 'react';
import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react';

import AppSidebar from './AppSidebar';
import AppNavbar from './AppNavbar';

const theme: CustomFlowbiteTheme = {
  darkThemeToggle: {
    root: {
      base: 'w-full rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700',
    },
  },
  sidebar: {
    root: {
      inner:
        'w-full h-full top-0 sticky overflow-y-auto overflow-x-hidden rounded bg-brand-blue-light py-4 px-3 dark:bg-gray-800',
    },
  },
  navbar: {
    root: {
      base: 'border-gray-200 bg-brand-blue-light px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4',
    },
  },
};

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Flowbite theme={{ theme }}>
      <div className="relative flex w-full overflow-x-hidden bg-brand-blue-light dark:bg-gray-900 h-screen overflow-y-auto">
        <AppSidebar className="hidden md:block md:w-fit" />

        <div
          id="main-content"
          className="flex flex-col flex-grow h-full"
        >
          <AppNavbar />
          <main className="flex flex-col w-full overflow-x-hidden bg-white flex-grow dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </Flowbite>
  );
};

export default DashboardLayout;
