import { Timeline } from 'flowbite-react';

import SkeletonElement from '@/modules/_partials/shared/SkeletonElement';

const ProjectsSkeleton = () => {
  return (
    <div className="mt-6 md:mt-10 flex flex-col  bg-white dark:bg-gray-800 rounded-[30px] p-4 md:p-8">
      <SkeletonElement className="w-32 h-4 mb-4" />
      <Timeline>
        {Array.from({ length: 3 }, (_, index) => (
          <Timeline.Item key={index}>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Time>
                <SkeletonElement className="w-32 h-4" />
              </Timeline.Time>
              <Timeline.Title>
                <SkeletonElement className="w-64 h-4" />
              </Timeline.Title>
              <Timeline.Body>
                <SkeletonElement className="w-64 h-4" />
              </Timeline.Body>
              <SkeletonElement className="w-48 h-8 rounded" />
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default ProjectsSkeleton;
