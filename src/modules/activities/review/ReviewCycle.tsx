/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable sonarjs/no-all-duplicated-branches */
import { Avatar, Button, Badge } from 'flowbite-react';
import { HiOutlineArrowRight, HiPencil } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Helmet from 'react-helmet';

import PeerReviewer from './partials/PeerReviewer';
import SelfReview from './partials/SelfReview';
import AddReviewCycle from './partials/AddReviewCyle';
import ManagerReview from './partials/ManagerReview';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { endCycle, startCycle, getAllCyles } from '@/api/cyle.api';
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
import { Cycle } from '@/interfaces/cycle.interface';
import { calculateActiveCycle } from '@/redux/slices/cycleSlice';

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
  const [decision, setDecision] = useState<string | null>(null);
  const { tokenData } = useAppSelector(state => state.profile);
  const isAdminOrArchitect = ['admin', 'architect'].includes(
    tokenData?.role,
  );
  const { activeCycle, loading, cycles } = useAppSelector(
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
    if (
      activeCycle?.id &&
      tokenData?.id &&
      tokenData?.role !== 'admin'
    ) {
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
    setDecision(item.id as string);
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

  const restCycles = cycles.filter(
    item => item.id !== activeCycle?.id,
  );

  const onEndCycle = async (cycle: Cycle) => {
    setDecision(cycle.id);
    await dispatch(endCycle(cycle));
    setDecision(null);
    dispatch(calculateActiveCycle());
  };

  const onStartCycle = async (cycle: Cycle) => {
    setDecision(cycle.id);
    await dispatch(startCycle(cycle));
    setDecision(null);
    dispatch(calculateActiveCycle());
  };

  return (
    <>
      <Helmet>
        <title>Review Cycle</title>
        <meta name="description" content="Review Cycle" />
      </Helmet>
      <DataLayout
        isLoading={loading && !activeCycle && !restCycles.length}
      >
        {tokenData?.role === 'admin' ? (
          <AddReviewCycle>
            <Button className="ml-auto mb-4">Add Cycle</Button>
          </AddReviewCycle>
        ) : null}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800 w-full items-start flex flex-wrap gap-3 justify-between">
          <div className="flex flex-col items-start">
            {activeCycle ? (
              <>
                <h3 className="text-2xl font-medium flex items-center flex-wrap">
                  Active Cycle
                  {activeCycle ? `(${activeCycle.name})` : ''}
                  <Badge color="success" className="ml-1">
                    Active
                  </Badge>
                  {tokenData?.role === 'admin' ? (
                    <AddReviewCycle
                      title="Edit Review Cycle"
                      cycle={activeCycle}
                    >
                      <Button outline pill className="ml-3" size="xs">
                        <HiPencil className="h-6 w-6" />
                      </Button>
                    </AddReviewCycle>
                  ) : null}
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

          <div className="flex items-center space-x-3">
            {activeCycle && !isAdminOrArchitect ? (
              <>
                <PeerReviewer />
                {!isMadeSelfReview && (
                  <SelfReview
                    title="Self Review"
                    className="py-3 px-4 text-sm font-medium"
                  />
                )}
              </>
            ) : null}
            {tokenData?.role === 'admin' ? (
              <>
                <Button
                  color="failure"
                  isProcessing={decision === activeCycle?.id}
                  onClick={() => {
                    if (activeCycle) {
                      onEndCycle(activeCycle);
                    }
                  }}
                  className={`${activeCycle ? '' : 'hidden'}`}
                >
                  End Cycle
                </Button>
              </>
            ) : null}
          </div>
        </div>
        {tokenData?.role === 'admin' &&
          restCycles.length &&
          restCycles.map(item => (
            <div
              key={item.id}
              className="mt-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800 w-full items-start flex flex-wrap gap-3 justify-between"
            >
              <div className="flex flex-col items-start">
                <h3 className="text-2xl font-medium flex items-center flex-wrap">
                  {item.name}
                  <Badge
                    color={item.active ? 'success' : 'failure'}
                    className="ml-1"
                  >
                    {item.active ? 'Active' : 'Inactive'}
                  </Badge>
                  <AddReviewCycle
                    title="Edit Review Cycle"
                    cycle={item}
                  >
                    <Button outline pill className="ml-3" size="xs">
                      <HiPencil className="h-6 w-6" />
                    </Button>
                  </AddReviewCycle>
                </h3>
                <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                  {calculateCycleEnd(item)}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {item.active ? (
                  <Button
                    color="failure"
                    isProcessing={decision === item.id}
                    onClick={() => onEndCycle(item)}
                  >
                    End Cycle
                  </Button>
                ) : (
                  <Button
                    isProcessing={decision === item.id}
                    onClick={() => onStartCycle(item)}
                  >
                    Start Cycle
                  </Button>
                )}
              </div>
            </div>
          ))}
      </DataLayout>

      <DataLayout
        isLoading={
          (isLoadingReviewers || loading) && !reviewers.length
        }
        loader={<DataLoader count={3} />}
      >
        {!reviewRequests.length && tokenData?.role !== 'admin' ? (
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
              <div className="flex items-center space-x-2">
                {isAdminOrArchitect ? (
                  <>
                    {['pending', 'rejected'].includes(
                      status as string,
                    ) ? (
                      <Button
                        gradientMonochrome="info"
                        type="submit"
                        size="xs"
                        isProcessing={decision === item.id}
                        onClick={() => onDecision(item, 'approve')}
                        className={`${
                          tokenData?.role === 'admin' ? 'hidden' : ''
                        }`}
                      >
                        Approve Reviewer
                      </Button>
                    ) : (
                      <Button
                        gradientMonochrome="failure"
                        type="submit"
                        size="xs"
                        isProcessing={decision === item.id}
                        onClick={() => onDecision(item, 'reject')}
                        className={`${
                          tokenData?.role === 'admin' ? 'hidden' : ''
                        }`}
                      >
                        Revoke Reviewer
                      </Button>
                    )}
                    <ManagerReview
                      developerId={item.developer?.id}
                      title={`Add Manager Review to ${developer?.firstName}`}
                    />
                  </>
                ) : (
                  <SelfReview
                    title="Add peer review"
                    developerId={developer?.id}
                  />
                )}
              </div>
            </div>
          );
        })}
      </DataLayout>
    </>
  );
};

export default ReviewCycle;
