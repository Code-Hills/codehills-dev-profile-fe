/* eslint-disable sonarjs/no-duplicate-string */

import { Dropdown, Modal } from 'flowbite-react';
import { useState } from 'react';

import DashboardLayout from '@/modules/_partials/layouts/DashboardLayout';
import CustomDatepicker from '@/modules/_partials/shared/CustomDatepicker';

const developers = [
  {
    id: 1,
    name: 'John Doe',
    cycle: '2021 Q1',
    reviewType: 'Peer Review 1',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    cycle: '2021 Q1',
    reviewType: 'Peer Review 2',
    rating: 3,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    cycle: '2021 Q1',
    reviewType: 'Peer Review 2',
    rating: 3,
  },
  {
    id: 4,
    name: 'Kevin Johnson',
    cycle: '2021 Q1',
    reviewType: 'Peer Review 1',
    rating: 5,
  },

  {
    id: 5,
    name: 'John Doe',
    cycle: '2021 Q2',
    reviewType: 'Peer Review 1',
    rating: 5,
  },
  {
    id: 6,
    name: 'Jane Smith',
    cycle: '2021 Q2',
    reviewType: 'Manager Review',
    rating: 3,
  },
  {
    id: 7,
    name: 'Bob Johnson',
    cycle: '2021 Q2',
    reviewType: 'Peer Review 1',
    rating: 5,
  },
  {
    id: 8,
    name: 'Kevin Johnson',
    cycle: '2021 Q2',
    reviewType: 'Manager Review',
    rating: 3,
  },
  {
    id: 9,
    name: 'John Doe',
    cycle: '2021 Q2',
    reviewType: 'Peer Review 1',
    rating: 5,
  },
  {
    id: 10,
    name: 'Jane Smith',
    cycle: '2021 Q2',
    reviewType: 'Peer Review 2',
    rating: 3,
  },
  {
    id: 11,
    name: 'Bob Johnson',
    cycle: '2021 Q2',
    reviewType: 'Peer Review 1',
    rating: 5,
  },
  {
    id: 12,
    name: 'Kevin Johnson',
    cycle: '2021 Q2',
    reviewType: 'Peer Review 2',
    rating: 3,
  },
];

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

const ReceivedReviews = () => {
  const [currentReview, setCurrentReview] = useState<
    (typeof developers)[0] | null
  >(null);
  return (
    <DashboardLayout>
      <div className="flex flex-col p-4 md:px-8 bg-brand-blue-light/70 dark:bg-transparent flex-grow">
        <div className="flex gap-3 justify-between mb-3">
          <h1 className="text-2xl font-medium">
            My Received Reviews
          </h1>
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
                      Reviewer
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                    >
                      Cycle
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                    >
                      Review Type
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                    >
                      Rating
                    </th>

                    <th
                      scope="col"
                      className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                    >
                      Action
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
                      <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                        {developer.cycle}
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {developer.reviewType}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`${getStatusClassName(
                            developer.rating,
                          )} text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border`}
                        >
                          {developer.rating}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <a
                          href={`#view-${developer.id}`}
                          onClick={() => {
                            setCurrentReview(developer);
                          }}
                          className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 border border-blue-100 dark:border-blue-500"
                        >
                          See more
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        dismissible
        show={!!currentReview}
        onClose={() => setCurrentReview(null)}
      >
        <Modal.Header>
          {`Review From ${currentReview?.name}`}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Review Type
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {currentReview?.reviewType}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Rating
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {currentReview?.rating} / 5
              </span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Written review
              </span>
              <span className="text-sm text-gray-900 dark:text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Quisquam, voluptatibus. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Quisquam,
                voluptatibus. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quisquam, voluptatibus. Lorem ipsum
                dolor sit amet consectetur adipisicing elit.
              </span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </DashboardLayout>
  );
};

export default ReceivedReviews;
