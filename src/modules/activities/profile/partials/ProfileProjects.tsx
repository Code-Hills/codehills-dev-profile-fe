import { Button, Timeline } from 'flowbite-react';
import { HiArrowNarrowRight } from 'react-icons/hi';

const ProfileProjects = () => {
  return (
    <div className="mt-6 md:mt-10 flex flex-col  bg-white dark:bg-gray-800 rounded-[30px] p-4 md:p-8">
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <Timeline>
        {Array.from({ length: 3 }, (_, index) => (
          <Timeline.Item key={index}>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Time>March 2023 - March 2024</Timeline.Time>
              <Timeline.Title>
                HR Management project - Web Development
              </Timeline.Title>
              <Timeline.Body>
                Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Quisquam, quod. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam, quod.
              </Timeline.Body>
              <Button color="gray">
                Explore more
                <HiArrowNarrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default ProfileProjects;
