import { useState } from 'react';

const Filters = ({
  setFilteredProjects,
}: {
  setFilteredProjects: (arg: string) => void;
}) => {
  const [filter, setFilter] = useState<string>('all');

  const handleChange = (arg: string) => {
    setFilter(arg);
    setFilteredProjects(arg);
  };

  const dynamicFilterStyles = (arg: string) =>
    `${
      filter === arg ? 'bg-blue-300 text-blue-600' : ''
    } text-md font-semibold cursor-pointer rounded py-0.5 px-1  hover:text-blue-600`;

  return (
    <div className="dark:text-white flex gap-x-6 items-center px-4 md:px-8 py-2">
      <p className="font-semibold hidden md:block">Show: </p>
      <div className="flex items-center justify-center gap-x-6 md:gap-x-12 flex-1">
        <span
          aria-hidden="true"
          className={`${dynamicFilterStyles('all')}`}
          onClick={() => handleChange('all')}
        >
          All
        </span>
        <span
          aria-hidden="true"
          className={`${dynamicFilterStyles('completed')}`}
          onClick={() => handleChange('completed')}
        >
          Completed
        </span>
        <span
          aria-hidden="true"
          className={`${dynamicFilterStyles('in-progress')}`}
          onClick={() => handleChange('in-progress')}
        >
          In progress
        </span>
        <span
          aria-hidden="true"
          className={`${dynamicFilterStyles('pending')}`}
          onClick={() => handleChange('pending')}
        >
          Pending
        </span>
      </div>
    </div>
  );
};

export default Filters;
