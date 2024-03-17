import React from 'react';

interface NotificationIconProps {
  counter: number;
  onClick: () => void;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
  counter,
  onClick,
}) => {
  return (
    <div className="relative" onClick={onClick} role="button">
      <svg
        width={48}
        height={48}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
      </svg>
      {counter > 0 && (
        <div
          className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center bg-red-500 text-white rounded-full"
          aria-label="Notification Counter"
        >
          <span className="text-xs">{counter}</span>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
