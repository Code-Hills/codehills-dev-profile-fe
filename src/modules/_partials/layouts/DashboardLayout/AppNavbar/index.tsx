import React from 'react';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { NavLink } from 'react-router-dom';

import AppSidebar from '../AppSidebar';

import logo from '@/assets/images/logos/logo.svg';
import NotificationButton from '@/modules/_partials/shared/Notifications/NotificationButton';
import Notifications from '@/modules/_partials/shared/Notifications';
import Searchbar from '@/modules/_partials/shared/Searchbar';

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
            className="mr-3 h-6 sm:h-9"
            alt="CodeHills Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            CodeHills
          </span>
        </NavLink>
      </div>
      <div className="hidden md:flex flex-grow">
        <Searchbar />
      </div>
      <div className="flex md:order-2 space-x-2 md:space-x-4">
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
            <Avatar
              alt="User settings"
              img="https://flowbiteFlowbitee.com/docs/images/people/profile-picture-5.jpg"
              rounded
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
