import { Avatar } from 'flowbite-react';

import ProfileForm from './ProfileForm';
import ChangeAvatar from './ChangeAvatar';

import cover from '@/assets/images/profile/cover.png';

const UserInformation = ({
  profile = {},
}: {
  profile: Record<string, any>;
}) => {
  return (
    <div className="flex flex-col  bg-white dark:bg-gray-800 rounded-[30px]">
      <div
        className="rounded-t-[30px] flex flex-col bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div className="rounded-t-[30px] w-full flex flex-col bg-gradient-to-t from-gray-900 px-4 md:px-8">
          <div className="flex items-end justify-between space-x-3 translate-y-10 w-full">
            <div className="flex relative">
              {profile.avatar ? (
                <Avatar
                  img={profile.avatar}
                  alt={profile.firstName}
                  rounded
                  size="xl"
                />
              ) : (
                <Avatar rounded size="xl" />
              )}
              <div className="top-4 -right-16 absolute">
                <ChangeAvatar />
              </div>
            </div>
            <div className="translate-y-2 md:translate-y-4">
              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-b-[30px] mt-8 flex flex-col p-4 md:p-8">
        <h1 className="text-2xl font-bold">{profile.displayName}</h1>
        {profile.address && (
          <p className="text-sm capitalize mt-2 text-gray-400 dark:text-gray-200">
            {profile.address.city}, {profile.address.country}
          </p>
        )}
        <p className="text-sm capitalize mt-2">{profile.role}</p>
      </div>
    </div>
  );
};

export default UserInformation;
