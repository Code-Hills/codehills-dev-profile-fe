import React from 'react';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { NavLink } from 'react-router-dom';
import { HiOutlineUserCircle } from 'react-icons/hi';

import AppSidebar from '../AppSidebar';

import logo from '@/assets/images/logos/orginal.png';
import NotificationButton from '@/modules/_partials/shared/Notifications/NotificationButton';
import Notifications from '@/modules/_partials/shared/Notifications';
import SearchPopupModal from '@/modules/_partials/shared/SearchPopupModal';

const AppNavbar = () => {
  return (
    <Navbar fluid rounded>
      <div className="flex items-center">
        <Dropdown arrowIcon={false} inline label={<Navbar.Toggle />}>
          <AppSidebar />
        </Dropdown>
        <NavLink
          to="/dashboard"
          className="md:hidden flex items-center"
        >
          <img
            src={logo}
            className="mr-3 h-8 sm:h-9"
            alt="CodeHills Logo"
          />
          <span className="hidden md:block self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            CodeHills
          </span>
        </NavLink>
      </div>
      <div className="flex md:order-2 space-x-2 md:space-x-4 items-center">
        <SearchPopupModal />
        <Dropdown
          arrowIcon={false}
          inline
          label={<NotificationButton />}
        >
          <Notifications />
        </Dropdown>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <HiOutlineUserCircle
              size={32}
              className="text-gray-800 dark:text-gray-400"
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              Celestin Niyindagiriye
            </span>
            <span className="block truncate text-sm font-medium">
              nicele08@gmail.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Ratings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
