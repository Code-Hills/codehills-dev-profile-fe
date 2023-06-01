import { useEffect } from 'react';

import ProfileWrapper from './partials/ProfileWrapper';

import {
  useAppSelector,
  useAppDispatch,
} from '@/modules/_partials/hooks/useRedux';
import {
  getMyProfile,
  getMyProjects,
} from '@/redux/features/profile/profileSlice';

const ProfileActivity = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error, projects } = useAppSelector(
    state => state.profile,
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  useEffect(() => {
    if (user?.id) {
      dispatch(getMyProjects(user.id));
    }
  }, [user]);
  return (
    <ProfileWrapper
      isLoading={isLoading}
      error={error}
      profile={user || {}}
      projects={projects}
    />
  );
};

export default ProfileActivity;
