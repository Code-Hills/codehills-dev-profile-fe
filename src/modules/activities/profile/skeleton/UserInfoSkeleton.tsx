import cover from '@/assets/images/profile/cover.png';
import SkeletonElement from '@/modules/_partials/shared/SkeletonElement';

const UserInfoSkeleton = () => {
  return (
    <div className="flex flex-col  bg-white dark:bg-gray-800 rounded-[30px]">
      <div
        className="rounded-t-[30px] flex flex-col bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div className="rounded-t-[30px] w-full flex flex-col bg-gradient-to-t from-gray-900 px-4 md:px-8">
          <div className="flex items-end justify-between space-x-3 translate-y-10 w-full">
            <SkeletonElement className="w-32 h-32 rounded-full" />
            <div className="translate-y-2 md:translate-y-4">
              <SkeletonElement className="w-12 h-4 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-b-[30px] mt-8 flex flex-col p-4 md:p-8">
        <SkeletonElement className="w-48 h-3 rounded" />
        <SkeletonElement className="w-48 h-2 rounded mt-2" />
        <SkeletonElement className="w-48 h-2 rounded mt-2" />
      </div>
    </div>
  );
};

export default UserInfoSkeleton;
