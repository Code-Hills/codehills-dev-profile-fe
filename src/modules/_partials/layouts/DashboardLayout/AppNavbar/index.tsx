import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';

import AppSidebar from '../AppSidebar';

import logo from '@/assets/images/logos/orginal.png';
import NotificationIcon from '@/modules/_partials/shared/Notifications/NotificationIcon';
import Notifications from '@/modules/_partials/shared/Notifications';
import SearchPopupModal from '@/modules/_partials/shared/SearchPopupModal';
import { useAppSelector } from '@/modules/_partials/hooks/useRedux';

const AppNavbar = () => {
  const { tokenData, user } = useAppSelector(state => state.profile);
  const { avatar, firstName, email, displayName } =
    user || tokenData || {};
  const navigate = useNavigate();
  return (
    <Navbar fluid rounded>
      <div className="flex items-center">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <HiMenu
              size={32}
              className="text-gray-800 dark:text-gray-400 mr-2 md:hidden"
            />
          }
        >
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
          label={<NotificationIcon />}
        >
          <Notifications />
        </Dropdown>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            avatar ? (
              <Avatar rounded img={avatar} alt={firstName} />
            ) : (
              <Avatar rounded />
            )
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {displayName || firstName}
            </span>
            <span className="block truncate text-sm font-medium">
              {email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => navigate('/profile')}>
            Profile
          </Dropdown.Item>
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
