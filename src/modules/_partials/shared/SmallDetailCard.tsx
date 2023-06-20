import React from 'react';
import { Link } from 'react-router-dom';

const SmallDetailCard = ({
  path = '/',
  children,
  title = '5 Developers',
  count = 0,
}: {
  path: string;
  children: React.ReactNode;
  title: string;
  count: number;
}) => {
  return (
    <Link
      to={path}
      className="flex space-x-2 items-center max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      {children}

      <div className="flex flex-col">
        <h2 className="mb-1 font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="font-bold text-gray-700 dark:text-gray-400">
          {count.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default SmallDetailCard;
