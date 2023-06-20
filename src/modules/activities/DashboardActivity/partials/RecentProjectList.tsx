import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    name: 'Project 1',
    start: '2021-01-01',
    end: '2021-01-31',
  },
  {
    id: 2,
    name: 'Project 2',
    start: '2021-02-01',
    end: '2021-02-28',
  },
];

const RecentProjectList = () => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                >
                  Start Date
                </th>
                <th
                  scope="col"
                  className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                >
                  End Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {projects.map(project => (
                <tr
                  key={project.id}
                  className="even:bg-gray-100 dark:even:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                    <Link
                      to={`/projects/${project.id}`}
                      className="block hover:text-brand-blue dark:hover:text-gray-300 font-semibold truncate max-w-xs md:max-w-sm lg:max-w-md"
                    >
                      {project.name}
                    </Link>
                  </td>
                  <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {project.start}
                  </td>
                  <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {project.end}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentProjectList;
