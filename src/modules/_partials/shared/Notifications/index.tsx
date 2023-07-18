import NotificationList from './NotificationList';

const Notifications = () => {
  return (
    <div
      className="max-w-sm overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg dark:divide-gray-600 dark:bg-gray-700"
      id="notification-dropdown"
    >
      <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        Notifications
      </div>
      <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
        You have no notifications
      </p>
      {/* <NotificationList /> */}
    </div>
  );
};

export default Notifications;
