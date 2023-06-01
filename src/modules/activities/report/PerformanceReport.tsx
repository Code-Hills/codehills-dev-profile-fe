/* eslint-disable sonarjs/no-duplicate-string */
import { FaFileExcel } from 'react-icons/fa';
import { Button, Dropdown } from 'flowbite-react';

const developers = [
  {
    id: 1,
    name: 'John Doe',
    peerRating1: 4,
    peerRating2: 5,
    selfRating: 4,
    managerRating: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    peerRating1: 3,
    peerRating2: 3,
    selfRating: 4,
    managerRating: 4,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    peerRating1: 2,
    peerRating2: 2,
    selfRating: 3,
    managerRating: 3,
  },
  {
    id: 4,
    name: 'Kevin Johnson',
    peerRating1: 1,
    peerRating2: 2,
    selfRating: 2,
    managerRating: 1,
  },

  {
    id: 5,
    name: 'John Doe',
    peerRating1: 4,
    peerRating2: 5,
    selfRating: 4,
    managerRating: 5,
  },
  {
    id: 6,
    name: 'Jane Smith',
    peerRating1: 3,
    peerRating2: 3,
    selfRating: 4,
    managerRating: 4,
  },
  {
    id: 7,
    name: 'Bob Johnson',
    peerRating1: 2,
    peerRating2: 2,
    selfRating: 3,
    managerRating: 3,
  },
  {
    id: 8,
    name: 'Kevin Johnson',
    peerRating1: 1,
    peerRating2: 2,
    selfRating: 2,
    managerRating: 1,
  },
  {
    id: 9,
    name: 'John Doe',
    peerRating1: 4,
    peerRating2: 5,
    selfRating: 4,
    managerRating: 5,
  },
  {
    id: 10,
    name: 'Jane Smith',
    peerRating1: 3,
    peerRating2: 3,
    selfRating: 4,
    managerRating: 4,
  },
  {
    id: 11,
    name: 'Bob Johnson',
    peerRating1: 2,
    peerRating2: 2,
    selfRating: 3,
    managerRating: 3,
  },
  {
    id: 12,
    name: 'Kevin Johnson',
    peerRating1: 1,
    peerRating2: 2,
    selfRating: 2,
    managerRating: 1,
  },
];

const getTotalRating = (developer: Record<string, any>) => {
  return (
    developer.peerRating1 +
    developer.peerRating2 +
    developer.selfRating +
    developer.managerRating
  );
};

const getAverageRating = (developer: Record<string, any>) => {
  const totalRating = getTotalRating(developer);
  return totalRating / 4;
};

const getStatusClassName = (rating: number) => {
  if (rating >= 4) {
    return 'bg-green-100 text-green-800 border-green-100 dark:border-green-500 dark:bg-gray-700 dark:text-green-400';
  }
  if (rating >= 3) {
    return 'bg-yellow-100 text-yellow-800 border-yellow-100 dark:border-yellow-400 dark:bg-gray-700 dark:text-yellow-400';
  }
  if (rating >= 2) {
    return 'bg-orange-100 text-orange-800 border-orange-100 dark:bg-gray-700 dark:border-orange-300 dark:text-orange-300';
  }
  return 'bg-red-100 text-red-800 border-red-100 dark:border-red-400 dark:bg-gray-700 dark:text-red-400';
};

const PerformanceReport = () => {
  return (
    <>
      <div className="flex gap-3 flex-wrap justify-between mb-3">
        <h1 className="text-2xl font-medium">Performance Ratings</h1>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Cycle:
            </span>
            <Dropdown label="All" size="xs">
              <Dropdown.Item className="whitespace-nowrap">
                2023 Q2
              </Dropdown.Item>
              <Dropdown.Item className="whitespace-nowrap">
                2022 Q2
              </Dropdown.Item>
              <Dropdown.Item className="whitespace-nowrap">
                2021 Q2
              </Dropdown.Item>
              <Dropdown.Item className="whitespace-nowrap">
                2020 Q2
              </Dropdown.Item>
            </Dropdown>
          </div>
          <Button size="xs" gradientMonochrome="info">
            <FaFileExcel size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>
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
                    Peer Review 1
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                  >
                    Peer Review 2
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                  >
                    Self Review
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                  >
                    Manager Review
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                  >
                    Total Rating
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                  >
                    Average Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                {developers.map(developer => (
                  <tr
                    key={developer.id}
                    className="even:bg-gray-100 dark:even:bg-gray-700"
                  >
                    <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                      {developer.name}
                    </td>
                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                      {developer.peerRating1}
                    </td>
                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-white">
                      {developer.peerRating2}
                    </td>
                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                      {developer.selfRating}
                    </td>
                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                      {developer.managerRating}
                    </td>
                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-gray-400">
                      {getTotalRating(developer)}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`${getStatusClassName(
                          getAverageRating(developer),
                        )} text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border`}
                      >
                        {getAverageRating(developer)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerformanceReport;
