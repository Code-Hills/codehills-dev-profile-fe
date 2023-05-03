import React, { useState } from 'react';

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="ml-2">
      <button
        id="dropdownDelayButton"
        className="text-rgba-22-27-44-70 bg-gray-300 hover:bg-gray-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={handleDropdownToggle}
      >
        Attributes
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {/* Dropdown menu */}
      <div
        id="dropdownDelay"
        className={`z-50 ${
          isDropdownOpen ? 'block' : 'hidden'
        } bg-white divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
      >
        <ul
          className="py-2 z-50 bg-gray-200 text-sm text-gray-700 dark:text-gray-700 w-40 absolute"
          aria-labelledby="dropdownDelayButton"
        >
          <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Dashboad
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
