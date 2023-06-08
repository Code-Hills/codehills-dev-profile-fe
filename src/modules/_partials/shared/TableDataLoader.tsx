import React from 'react';

const TableDataLoader = ({
  colSpan = 5,
  children,
  isLoading = false,
  data = [],
}: {
  colSpan?: number;
  children: React.ReactNode;
  isLoading?: boolean;
  data?: any[];
}) => {
  const dummyRows = Array.from(Array(colSpan).keys());
  return (
    <>
      {isLoading
        ? dummyRows.map(row => (
            <tr key={row}>
              <td colSpan={colSpan}>
                <span className="block h-12 animate-pulse bg-gray-200  transition-all duration-300 dark:bg-gray-700 rounded" />
              </td>
            </tr>
          ))
        : children}

      {!isLoading && data.length === 0 && (
        <tr>
          <td
            colSpan={colSpan}
            className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white"
          >
            No data found
          </td>
        </tr>
      )}
    </>
  );
};

export default TableDataLoader;
