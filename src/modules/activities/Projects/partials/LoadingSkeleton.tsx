import SkeletonElement from '@/modules/_partials/shared/SkeletonElement';

const ProjectSkeleton = () => {
  return (
    <div className="w-72 h-72 px-4 py-2 animate-pulse bg-gray-300  transition-all duration-300 dark:bg-gray-800 rounded-lg shadow">
      <div className="flex justify-center">
        <SkeletonElement className="w-1/2 h-6" />
      </div>
      <SkeletonElement className="mt-8 h-16" />
      <div className="flex justify-between mt-8">
        <SkeletonElement className="w-24 h-6" />
        <SkeletonElement className="w-24  h-6" />
      </div>
      <div className="flex justify-between items-center mt-10">
        <SkeletonElement className="w-24 h-6" />
        <SkeletonElement className="w-24  h-10 rounded-md" />
      </div>
    </div>
  );
};

export default ProjectSkeleton;
