import { Avatar, Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import PeerReviewer from './partials/PeerReviewer';
import SelfReview from './partials/SelfReview';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { getAllCyles } from '@/api/cyle.api';
import { calculateCycleEnd } from '@/helpers/cyle.helper';
import { getDeveloperReviewers } from '@/api/reviewer.api';
import DataLayout from '@/modules/_partials/layouts/DataLayout';
import DataLoader from '@/modules/_partials/shared/DataLoader';

const ReviewCycle = () => {
  const { tokenData } = useAppSelector(state => state.profile);
  const { activeCycle, loading } = useAppSelector(
    state => state.cycle,
  );
  const { reviewers, loading: isLoadingReviewers } = useAppSelector(
    state => state.reviewer,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCyles());
  }, []);

  useEffect(() => {
    if (activeCycle?.id && tokenData?.id) {
      dispatch(
        getDeveloperReviewers({
          reviewCyleId: activeCycle.id,
          developerId: tokenData.id,
        }),
      );
    }
  }, [activeCycle]);

  const reviewRequests = reviewers.filter(
    item => item.reviewerId === tokenData?.id,
  );

  return (
    <>
      <DataLayout isLoading={loading && !activeCycle}>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800 w-full items-start flex flex-wrap gap-3 justify-between">
          <div className="flex flex-col items-start">
            {activeCycle ? (
              <>
                <h3 className="text-2xl font-medium">
                  Review Cycle
                  {activeCycle ? `(${activeCycle.name})` : ''}
                </h3>
                <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                  {activeCycle ? calculateCycleEnd(activeCycle) : ''}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                No active review cycle
              </p>
            )}
            <Button
              size="xs"
              outline
              gradientDuoTone="cyanToBlue"
              className="mt-3"
              onClick={() => navigate('/reviews/received')}
            >
              Received reviews
              <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {activeCycle ? (
            <div className="flex items-center space-x-3">
              <PeerReviewer />
              <SelfReview
                title="Self Review"
                className="py-3 px-4 text-sm font-medium"
              />
            </div>
          ) : null}
        </div>
      </DataLayout>

      <DataLayout
        isLoading={
          (isLoadingReviewers || loading) && !reviewers.length
        }
        loader={<DataLoader count={3} />}
      >
        {!reviewRequests.length ? (
          <div className="flex flex-col mt-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 p-4 sm:p-6 dark:bg-gray-800">
            <p className="text-lg font-medium text-gray-500 mt-2 dark:text-gray-400">
              No review requests
            </p>
          </div>
        ) : null}
        {reviewRequests.map(({ developer, id }) => (
          <div
            key={id}
            className="gap-3 mt-4 flex-wrap bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 p-4 sm:p-6 dark:bg-gray-800 flex items-center"
          >
            <div className="shrink-0">
              <Avatar size="sm" img={developer?.avatar} rounded />
            </div>
            <p className="flex-grow">
              <span className="text-lg font-medium">
                {developer?.firstName} {developer?.lastName}
              </span>{' '}
              requested your review as a peer reviewer for the review
              cycle.
            </p>
            <SelfReview
              title="Add peer review"
              developerId={developer?.id}
            />
          </div>
        ))}
      </DataLayout>
    </>
  );
};

export default ReviewCycle;
