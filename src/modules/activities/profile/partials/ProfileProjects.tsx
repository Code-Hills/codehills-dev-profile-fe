import { Button, Timeline } from 'flowbite-react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { formatDate } from '@/helpers/format';
import { IProject } from '@/interfaces/project.interface';

const ProfileProjects = ({ projects }: { projects: IProject[] }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-6 md:mt-10 flex flex-col  bg-white dark:bg-gray-800 rounded-[30px] p-4 md:p-8">
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <Timeline>
        {projects.map(
          ({ id, name, description, endDate, startDate }) => (
            <Timeline.Item key={id || name}>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time>
                  {formatDate(startDate)} - {formatDate(endDate)}
                </Timeline.Time>
                <Timeline.Title>{name}</Timeline.Title>
                <Timeline.Body>{description}</Timeline.Body>
                <Button
                  color="gray"
                  onClick={() => navigate(`/projects/${id}`)}
                >
                  View more
                  <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Timeline.Content>
            </Timeline.Item>
          ),
        )}
      </Timeline>
    </div>
  );
};

export default ProfileProjects;
