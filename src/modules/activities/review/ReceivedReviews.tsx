/* eslint-disable sonarjs/no-duplicate-string */

import { Dropdown, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';

import { getAllCyles } from '@/api/cyle.api';
import { Cycle } from '@/interfaces/cycle.interface';
import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { getAllReviews } from '@/api/review.api';
import { Review } from '@/interfaces/review.interface';
import { getTimeAgo } from '@/helpers/cyle.helper';
import TableDataLoader from '@/modules/_partials/shared/TableDataLoader';

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
  const [currentCycle, setCurrentCycle] = useState<Cycle | null>(
    null,
  );
  const [currentReview, setCurrentReview] = useState<Review | null>(
    null,
  );
  const { tokenData } = useAppSelector(state => state.profile);
  const { cycles } = useAppSelector(state => state.cycle);
  const { reviews, loading } = useAppSelector(state => state.review);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCyles());
  }, []);

  useEffect(() => {
    dispatch(getAllReviews());
  }, []);

  const developerReviews = reviews
    .filter(review => {
      if (!currentCycle) return true;
      return review.reviewCycleId === currentCycle.id;
    })
    .filter(review => review.revieweeId === tokenData?.id);

  return (
    <>
      <div className="flex gap-3 justify-between flex-wrap mb-3">
        <h1 className="text-2xl font-medium">My Received Reviews</h1>
        <div className="relative flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Cycle:
          </span>
          <Dropdown label={currentCycle?.name ?? 'All'} size="xs">
            {cycles.map(cycle => (
              <Dropdown.Item
                key={cycle.id}
                onClick={() => setCurrentCycle(cycle)}
                className="whitespace-nowrap"
              >
                {cycle.name}
              </Dropdown.Item>
            ))}
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
                    Reviewed At
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
                <TableDataLoader
                  isLoading={loading}
                  colSpan={5}
                  data={developerReviews}
                >
                  {developerReviews.map(review => (
                    <tr
                      key={review.id}
                      className="even:bg-gray-100 dark:even:bg-gray-700"
                    >
                      <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                        {review.reviewer?.displayName}
                      </td>

                      <td className="capitalize p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {review.type}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`${getStatusClassName(
                            review.ratings,
                          )} text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border`}
                        >
                          {review.ratings}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                        {getTimeAgo(review.createdAt)}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <a
                          href={`#view-${review.id}`}
                          onClick={() => {
                            setCurrentReview(review);
                          }}
                          className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 border border-blue-100 dark:border-blue-500"
                        >
                          See more
                        </a>
                      </td>
                    </tr>
                  ))}
                </TableDataLoader>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        dismissible
        show={!!currentReview}
        onClose={() => setCurrentReview(null)}
      >
        <Modal.Header>
          {`Review From ${currentReview?.reviewer?.displayName}`}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Review Type
              </span>
              <span className="capitalize text-sm font-medium text-gray-900 dark:text-white">
                {currentReview?.type}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Rating
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {currentReview?.ratings} / 5
              </span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Written review
              </span>
              <span className="text-sm text-gray-900 dark:text-white">
                {currentReview?.description}
              </span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReceivedReviews;
