import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_PUBLIC_DEFAULT_API);

const NotificationIcon: React.FC<any> = ({ onClick }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    socket.on('notificationCounter', (count: number) => {
      setCounter(count);
    });
    return () => {
      socket.off('notificationCounter');
    };
  }, []);

  const handleClick = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (
      event.type === 'click' ||
      (event.type === 'keydown' &&
        (event as React.KeyboardEvent).key === 'Enter')
    ) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className="relative"
      onClick={onClick}
      onKeyDown={handleClick}
      tabIndex={0}
    >
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
          className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center  text-white rounded-full"
          aria-label="Notification Counter"
        >
          <span className="text-xs">{counter}</span>
        </div>
      )}
    </button>
  );
};

export default NotificationIcon;
