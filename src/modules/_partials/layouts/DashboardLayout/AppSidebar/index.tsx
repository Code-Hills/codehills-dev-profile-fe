import React from 'react';
import { Sidebar, DarkThemeToggle } from 'flowbite-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import logo from '@/assets/images/logos/orginal.png';
import Constants from '@/constants';

const AppSidebar = ({ className = 'w-fit' }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={className}>
      <Sidebar aria-label="Sidebar with logo branding example">
        <Sidebar.Logo href="#" img={logo} imgAlt="CodeHills">
          CodeHills
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {Constants.navigation.sidebarNavLinks.map(link => {
              const isActive = pathname.includes(link.href);
              if (isActive) {
                return (
                  <NavLink
                    key={link.name}
                    className="group font-semibold dark:bg-[#475569]/40 dark:text-white text-gray-800 flex items-center justify-center rounded-lg p-2 text-base bg-white"
                    to={link.href}
                  >
                    <link.icon
                      size={24}
                      className="h-6 w-6 flex-shrink-0"
                    />

                    <span className="px-3 flex-1 whitespace-nowrap">
                      {link.name}
                    </span>
                  </NavLink>
                );
              }
              return (
                <Sidebar.Item
                  key={link.name}
                  href={link.href}
                  icon={link.icon}
                  onClick={(event: any) => {
                    event.preventDefault();
                    navigate(link.href);
                  }}
                >
                  {link.name}
                </Sidebar.Item>
              );
            })}
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
