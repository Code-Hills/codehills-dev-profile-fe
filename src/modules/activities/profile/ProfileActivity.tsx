import { useEffect } from 'react';

import ProfileWrapper from './partials/ProfileWrapper';

import DashboardLayout from '@/modules/_partials/layouts/DashboardLayout';
import {
  useAppSelector,
  useAppDispatch,
} from '@/modules/_partials/hooks/useRedux';
import { getMyProfile } from '@/redux/features/profile/profileSlice';

const ProfileActivity = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector(
    state => state.profile,
  );

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);
  return (
    <DashboardLayout>
      <div className="flex flex-col p-4 md:px-8 bg-brand-blue-light/70 dark:bg-transparent flex-grow">
        <ProfileWrapper
          isLoading={isLoading}
          error={error}
          data={user}
        />
      </div>
    </DashboardLayout>
  );
};

export default ProfileActivity;
