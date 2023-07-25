import { useEffect } from 'react';
import Helmet from 'react-helmet';

import ProfileWrapper from './partials/ProfileWrapper';

import {
  useAppSelector,
  useAppDispatch,
} from '@/modules/_partials/hooks/useRedux';
import {
  getMyProfile,
  getMyProjects,
} from '@/redux/features/profile/profileSlice';
import { getDashboard } from '@/api/dashboard.api';

const ProfileActivity = () => {
  const {
    dashboard: { recentProjects },
    loading,
  } = useAppSelector(state => state.dashboard);
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector(
    state => state.profile,
  );

  useEffect(() => {
    if (!recentProjects.length) {
      dispatch(getDashboard());
    }
  }, []);

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  useEffect(() => {
    if (user?.id) {
      dispatch(getMyProjects(user.id));
    }
  }, [user]);
  return (
    <>
      <Helmet>
        <title>
          {`${user?.displayName || 'My Profile'}`} - Codehills
        </title>
      </Helmet>
      <ProfileWrapper
        isLoading={(isLoading || loading) && !recentProjects.length}
        error={error}
        profile={user || {}}
        projects={recentProjects}
      />
    </>
  );
};

export default ProfileActivity;
