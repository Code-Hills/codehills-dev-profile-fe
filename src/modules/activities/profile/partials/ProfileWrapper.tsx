import UserInfoSkeleton from '../skeleton/UserInfoSkeleton';
import ProjectsSkeleton from '../skeleton/ProjectsSkeleton';

import UserInformation from './UserInformation';
import ProfileProjects from './ProfileProjects';

import SomethigWrong from '@/modules/_partials/shared/SomethigWrong';
import { IProject } from '@/interfaces/project.interface';

const ProfileWrapper = ({
  isLoading = false,
  error,
  profile,
  projects,
}: {
  isLoading?: boolean;
  error?: string | null;
  profile: Record<string, any>;
  projects: IProject[];
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
      <UserInformation profile={profile} />
      <ProfileProjects projects={projects} />
    </>
  );
};

export default ProfileWrapper;
