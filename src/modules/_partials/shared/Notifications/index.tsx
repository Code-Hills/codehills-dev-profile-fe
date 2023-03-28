/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { NavLink } from 'react-router-dom';

import jese from '@/assets/images/users/bonnie-green.png';
import leo from '@/assets/images/users/jese-leos.png';
import joseph from '@/assets/images/users/joseph-mcfall.png';
import leslie from '@/assets/images/users/leslie-livingston.png';
import robert from '@/assets/images/users/robert-brown.png';

const Notifications = () => {
  return (
    <div
      className="max-w-sm overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg dark:divide-gray-600 dark:bg-gray-700"
      id="notification-dropdown"
    >
      <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        Notifications
      </div>
      <div>
        <NavLink
          to="#"
          className="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
        >
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-11 h-11"
              src={jese}
              alt="Jese"
            />
            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 border border-white rounded-full bg-primary-700 dark:border-gray-700">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
              </svg>
            </div>
          </div>
          <div className="w-full pl-3">
            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
              New message from{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              : "Hey, what's up? All set for the presentation?"
            </div>
            <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
              a few moments ago
            </div>
          </div>
        </NavLink>
        <NavLink
          to="#"
          className="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
        >
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-11 h-11"
              src={leo}
              alt="Jese"
            />
            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-gray-900 border border-white rounded-full dark:border-gray-700">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
            </div>
          </div>
          <div className="w-full pl-3">
            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                Jese leos
              </span>{' '}
              and{' '}
              <span className="font-medium text-gray-900 dark:text-white">
                5 others
              </span>{' '}
              started following you.
            </div>
            <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
              10 minutes ago
            </div>
          </div>
        </NavLink>
        <NavLink
          to="#"
          className="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
        >
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-11 h-11"
              src={joseph}
              alt="Joseph"
            />
            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-red-600 border border-white rounded-full dark:border-gray-700">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="w-full pl-3">
            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                Joseph Mcfall
              </span>{' '}
              and{' '}
              <span className="font-medium text-gray-900 dark:text-white">
                141 others
              </span>{' '}
              love your story. See it and view more stories.
            </div>
            <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
              44 minutes ago
            </div>
          </div>
        </NavLink>
        <NavLink
          to="#"
          className="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
        >
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-11 h-11"
              src={leslie}
              alt="Leslie"
            />
            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-green-400 border border-white rounded-full dark:border-gray-700">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="w-full pl-3">
            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                Leslie Livingston
              </span>{' '}
              mentioned you in a comment:{' '}
              <span className="font-medium text-primary-700 dark:text-primary-500">
                @bonnie.green
              </span>{' '}
              what do you say?
            </div>
            <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
              1 hour ago
            </div>
          </div>
        </NavLink>
        <NavLink
          to="#"
          className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-11 h-11"
              src={robert}
              alt="Robert"
            />
            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-purple-500 border border-white rounded-full dark:border-gray-700">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
          </div>
          <div className="w-full pl-3">
            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                Robert Brown
              </span>{' '}
              posted a new video: Glassmorphism - learn how to
              implement the new design trend.
            </div>
            <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
              3 hours ago
            </div>
          </div>
        </NavLink>
      </div>
      <NavLink
        to="#"
        className="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
      >
        <div className="inline-flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
          View all
        </div>
      </NavLink>
    </div>
  );
};

export default Notifications;
