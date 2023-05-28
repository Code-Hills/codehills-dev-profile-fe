import React from 'react';
import {
  CustomFlowbiteTheme,
  Flowbite,
  useTheme,
} from 'flowbite-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    item: {
      base: 'text-gray-500 dark:text-gray-400 flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700',
    },
  },
  navbar: {
    root: {
      base: 'border-gray-200 bg-brand-blue-light px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4',
    },
  },
  modal: {
    header: {
      title:
        'text-xl font-medium text-gray-900 dark:text-white flex-grow flex-grow',
      close: {
        base: 'ml-auto text-white bg-red-500 flex items-center rounded-lg p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white',
      },
    },
  },
  dropdown: {
    content: 'py-0',
    floating: {
      content: 'text-sm text-gray-700 dark:text-gray-200',
    },
  },
};

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { mode } = useTheme();
  return (
    <Flowbite theme={{ theme }}>
      <div className="relative flex w-screen overflow-x-scroll bg-brand-blue-light dark:text-gray-50 dark:bg-gray-900 h-screen overflow-y-auto">
        <AppSidebar className="hidden md:block md:w-fit" />

        <div id="main-content" className="flex flex-col flex-grow">
          <AppNavbar />
          <main className="flex flex-col w-full overflow-x-auto bg-white flex-grow dark:bg-gray-900">
            {children}
            <ToastContainer
              theme={mode === 'dark' ? 'dark' : 'light'}
            />
          </main>
        </div>
      </div>
    </Flowbite>
  );
};

export default DashboardLayout;
