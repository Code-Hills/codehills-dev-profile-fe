import SkeletonElement from '@/modules/_partials/shared/SkeletonElement';

const UsersSkeleton = () => {
  return (
    <div className="flex justify-between flex-col  bg-red-500 dark:bg-gray-800  p-2">
      <SkeletonElement className="w-full h-16 rounded" />
      <SkeletonElement className="w-full h-16 rounded " />
      <SkeletonElement className="w-full h-16 rounded" />
    </div>
  );
};

export default UsersSkeleton;
