import { useEffect } from 'react';

import ProfileWrapper from './partials/ProfileWrapper';

import DashboardLayout from '@/modules/_partials/layouts/DashboardLayout';
import {
  useAppSelector,
  useAppDispatch,
} from '@/modules/_partials/hooks/useRedux';
import { getMyProfile, getMyProjects } from '@/pages/profileSlice';

const ProfileActivity = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error, projects } = useAppSelector(
    state => state.profile,
  );

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  useEffect(() => {
    if (user?.id) {
      dispatch(getMyProjects(user.id));
    }
  }, [user]);
  return (
    <DashboardLayout>
      <div className="flex flex-col p-4 md:px-8 bg-brand-blue-light/70 dark:bg-transparent flex-grow">
        <ProfileWrapper
          isLoading={isLoading}
          error={error}
          profile={user || {}}
          projects={projects}
        />
      </div>
    </DashboardLayout>
  );
};

export default ProfileActivity;
