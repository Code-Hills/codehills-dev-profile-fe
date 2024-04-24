import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { io } from 'socket.io-client';
import { Skeleton } from 'antd';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import SkeletonElement from '../SkeletonElement';

import jese from '@/assets/images/users/bonnie-green.png';
import {
  addNotifications,
  fetchNotifications,
} from '@/redux/features/notifications/notificationsSlice';

import ProjectSkeleton from '@/modules/activities/Projects/partials/LoadingSkeleton';
import { toast } from 'react-toastify';

const Notifications = () => {
  const dispatch = useAppDispatch();
  const {
    notifications,
    isLoading: isLoadingMore,
    pagination,
  } = useAppSelector(state => state.notifications);
  const { user } = useAppSelector(state => state.profile);

  const socket = io(import.meta.env.VITE_PUBLIC_DEFAULT_API);
  const userId = user?.id;

  useEffect(() => {
    dispatch(fetchNotifications({ page: 1, limit: 5 }));
    socket.on(`notification.${userId}`, data => {
      dispatch(addNotifications(data));
      toast.info(`${data.message}`);
    });

    return () => {
      socket.off(`notification.${userId}`);
    };
  }, []);

  const [showViewMore, setShowViewMore] = useState(true);
  // useEffect(() => {
  //   dispatch(getAllnotifications({ page, limit }));
  //   socket.on('notification', data => {
  //     dispatch(getAllnotifications(data));
  //     alert('working...............');
  //   });
  //   return () => {
  //     socket.off('notification');
  //   };
  // }, [dispatch, page, limit]);

  const handleLoadMore = async () => {
    const currentPage = pagination.currentPage;
    if (currentPage === pagination.totalPages) {
      return false;
    }
    dispatch(
      fetchNotifications({ page: currentPage + 1, append: true }),
    );
  };

  if (!notifications || notifications?.rows?.length === 0) {
    return (
      <div className="max-w-sm overflow-hidden text-base list-none bg-white rounded shadow-lg dark:bg-gray-700 h-20">
        <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          No Notifications
        </div>
      </div>
    );
  }
  const totalItems = notifications.totalItems;

  return (
    <div
      className="max-w-sm  overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg dark:divide-gray-600 dark:bg-gray-700"
      id="notification-dropdown"
    >
      <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        Notifications
      </div>

      {notifications &&
        notifications?.rows?.map(
          (notification: {
            id: React.Key | null | undefined;
            user: {
              displayName:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            };
            description:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            createdAt: string;
          }) => (
            <div
              key={notification?.id}
              className="overflow-y-auto h-auto"
            >
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
                      {notification?.user?.displayName}
                    </span>
                    : {notification?.description}
                  </div>
                  <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                    {formatDistanceToNow(
                      parseISO(notification?.createdAt),
                    )}{' '}
                    ago
                  </div>
                </div>
              </NavLink>
            </div>
          ),
        )}
      {showViewMore && (
        <div className="flex justify-center py-4">
          <div
            onClick={loadMoreNotifications}
            className="text-primary-600 dark:text-primary-400 hover:underline focus:outline-none cursor-pointer"
          >
            View More
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
