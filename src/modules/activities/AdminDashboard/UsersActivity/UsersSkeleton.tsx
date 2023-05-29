import SkeletonElement from '@/modules/_partials/shared/SkeletonElement';

const UsersSkeleton = () => {
  const skeletons = [1, 2, 3];
  return (
    <div className="flex justify-between flex-col  bg-red-500 dark:bg-gray-800  p-2">
      {skeletons.map(item => (
        <SkeletonElement key={item} className="w-full h-16 rounded" />
      ))}
    </div>
  );
};

export default UsersSkeleton;
