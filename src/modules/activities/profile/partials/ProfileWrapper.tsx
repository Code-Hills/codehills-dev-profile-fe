import UserInfoSkeleton from '../skeleton/UserInfoSkeleton';
import ProjectsSkeleton from '../skeleton/ProjectsSkeleton';

import UserInformation from './UserInformation';
import ProfileProjects from './ProfileProjects';

import SomethigWrong from '@/modules/_partials/shared/SomethigWrong';

const ProfileWrapper = ({
  isLoading = false,
  error,
  data,
}: {
  isLoading?: boolean;
  error?: string | null;
  data: any;
}) => {
  if (isLoading) {
    return (
      <>
        <UserInfoSkeleton />
        <ProjectsSkeleton />
      </>
    );
  }
  if (error) {
    return <SomethigWrong errorMessage={error} />;
  }
  return (
    <>
      <UserInformation profile={data || {}} />
      <ProfileProjects />
    </>
  );
};

export default ProfileWrapper;
