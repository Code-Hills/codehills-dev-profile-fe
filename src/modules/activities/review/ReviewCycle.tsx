import { Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import PeerReview from './partials/PeerReview';
import SelfReview from './partials/SelfReview';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { getAllCyles } from '@/api/cyle.api';
import { calculateCycleEnd } from '@/helpers/cyle.helper';

const users = [
  {
    avatar:
      'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
    name: 'Neil Sims',
  },
  {
    avatar:
      'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
    name: 'Bonnie Green',
  },
];

const ReviewCycle = () => {
  const { activeCycle } = useAppSelector(state => state.cycle);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCyles());
  }, []);

  return (
    <>
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800 w-full items-start flex flex-wrap gap-3 justify-between">
        <div className="flex flex-col items-start">
          <h3 className="text-2xl font-medium">
            Review Cycle{activeCycle ? `(${activeCycle.name})` : ''}
          </h3>
          <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
            {activeCycle ? calculateCycleEnd(activeCycle) : ''}
          </p>
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

        <div className="flex items-center space-x-3">
          <PeerReview />
          <SelfReview
            title="Self Review"
            className="py-3 px-4 text-sm font-medium"
          />
        </div>
      </div>

      {users.map(user => (
        <div className="gap-3 mt-4 flex-wrap bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 p-4 sm:p-6 dark:bg-gray-800 flex items-center">
          <div className="shrink-0">
            <img
              className="h-5 w-5 rounded-full"
              src={user.avatar}
              alt={user.name}
            />
          </div>
          <p className="flex-grow">
            <span className="text-lg font-medium">{user.name}</span>{' '}
            requested your review as a peer reviewer for the review
            cycle.
          </p>
          <SelfReview title="Add peer review" />
        </div>
      ))}
    </>
  );
};

export default ReviewCycle;
