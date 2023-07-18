/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable sonarjs/no-all-duplicated-branches */
import { Avatar, Button, Badge } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PeerReviewer from './partials/PeerReviewer';
import SelfReview from './partials/SelfReview';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { getAllCyles } from '@/api/cyle.api';
import { calculateCycleEnd } from '@/helpers/cyle.helper';
import {
  approveReviewer,
  getDeveloperReviewers,
  rejectReviewer,
} from '@/api/reviewer.api';
import DataLayout from '@/modules/_partials/layouts/DataLayout';
import DataLoader from '@/modules/_partials/shared/DataLoader';
import { IReviewer } from '@/interfaces/review.interface';
import { setMadeSelfReview } from '@/redux/slices/reviewerSlice';

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return <Badge color="warning">Pending</Badge>;
    case 'approved':
      return <Badge color="success">Approved</Badge>;
    case 'rejected':
      return <Badge color="failure">Rejected</Badge>;
    default:
      return <Badge color="warning">Pending</Badge>;
  }
};

const ReviewCycle = () => {
  const [decision, setDecision] = useState<
    'approve' | 'reject' | null
  >(null);
  const { tokenData } = useAppSelector(state => state.profile);
  const isAdminOrArchitect = ['admin', 'architect'].includes(
    tokenData?.role,
  );
  const { activeCycle, loading } = useAppSelector(
    state => state.cycle,
  );
  const {
    isMadeSelfReview,
    reviewers,
    loading: isLoadingReviewers,
  } = useAppSelector(state => state.reviewer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCyles());
  }, []);

  useEffect(() => {
    if (activeCycle?.id && tokenData?.id) {
      dispatch(
        getDeveloperReviewers({
          reviewCycleId: activeCycle.id,
          status: isAdminOrArchitect ? null : 'approved',
        }),
      );
    }
  }, [activeCycle]);

  const reviewRequests = !isAdminOrArchitect
    ? reviewers.filter(item => item.reviewerId === tokenData?.id)
    : reviewers;

  const onDecision = async (
    item: IReviewer,
    userDecision: 'approve' | 'reject',
  ) => {
    setDecision(userDecision);
    switch (userDecision) {
      case 'approve':
        await dispatch(approveReviewer(item));
        break;
      case 'reject':
        await dispatch(rejectReviewer(item));
        break;
      default:
        break;
    }
    setDecision(null);
  };

  useEffect(() => {
    const isSelfReview = reviewers.some(
      item => item.reviewerId === tokenData?.id,
    );
    dispatch(setMadeSelfReview(isSelfReview));
  }, [reviewers, tokenData?.id]);

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
            {!isAdminOrArchitect ? (
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
            ) : null}
          </div>

          {activeCycle && !isAdminOrArchitect ? (
            <div className="flex items-center space-x-3">
              <PeerReviewer />
              {!isMadeSelfReview && (
                <SelfReview
                  title="Self Review"
                  className="py-3 px-4 text-sm font-medium"
                />
              )}
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
        {reviewRequests.map(item => {
          const { developer, id, reviewer, status } = item;
          return (
            <div
              key={id}
              className="gap-3 mt-4 flex-wrap bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 p-4 sm:p-6 dark:bg-gray-800 flex items-center"
            >
              <div className="shrink-0">
                <Avatar size="sm" img={developer?.avatar} rounded />
              </div>
              <p className="flex-grow flex flex-wrap items-center gap-x-1 leading-relaxed">
                <span className="text-lg font-medium">
                  {developer?.firstName} {developer?.lastName}
                </span>
                <span>
                  {isAdminOrArchitect
                    ? `added ${reviewer?.email} as a reviewer for the review cycle`
                    : `requested your review as a peer reviewer for the review
              cycle.`}
                </span>
                {getStatusBadge(status as string)}
              </p>
              {isAdminOrArchitect ? (
                <>
                  {['pending', 'rejected'].includes(
                    status as string,
                  ) ? (
                    <Button
                      gradientMonochrome="info"
                      type="submit"
                      isProcessing={decision === 'approve'}
                      onClick={() => onDecision(item, 'approve')}
                      className={`${
                        tokenData?.role === 'admin' ? 'hidden' : ''
                      }`}
                    >
                      Approve
                    </Button>
                  ) : (
                    <Button
                      gradientMonochrome="failure"
                      type="submit"
                      isProcessing={decision === 'reject'}
                      onClick={() => onDecision(item, 'reject')}
                      className={`${
                        tokenData?.role === 'admin' ? 'hidden' : ''
                      }`}
                    >
                      Revoke
                    </Button>
                  )}
                </>
              ) : (
                <SelfReview
                  title="Add peer review"
                  developerId={developer?.id}
                />
              )}
            </div>
          );
        })}
      </DataLayout>
    </>
  );
};

export default ReviewCycle;
