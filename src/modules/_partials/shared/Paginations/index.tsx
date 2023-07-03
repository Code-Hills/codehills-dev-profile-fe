import React, { useState } from 'react';

interface PaginationProps {
  users: any[];
  itemsPerPage: number;
  clickedPage: (pg: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  users,
  itemsPerPage,
  clickedPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    clickedPage(pageNumber);
    setCurrentPage(pageNumber);
  };

  const renderButtons = () => {
    const buttons = [];

    for (let i = 3; i <= 5; i += 1) {
      const pageNumber = currentPage + i - 3;
      const isActive = pageNumber === currentPage;
      const isDisabled = pageNumber > totalPages || pageNumber < 1;

      buttons.push(
        <button
          type="button"
          key={i}
          onClick={() => handleClick(pageNumber)}
          disabled={isDisabled}
          className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 ${
            isActive
              ? 'text-blue-600 bg-blue-50'
              : 'hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          } ${isDisabled ? 'cursor-not-allowed' : ''}`}
        >
          {pageNumber}
        </button>,
      );
    }

    return buttons;
  };

  return (
    <nav aria-label="Page navigation example">
      <div className="flex items-center justify-center -space-x-px w-full">
        <button
          type="button"
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>Previous</span>
        </button>
        {renderButtons()}
        <button
          type="button"
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white flex"
        >
          <span>Next</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
