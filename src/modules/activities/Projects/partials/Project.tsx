import { MdArrowForwardIos } from 'react-icons/md';
import { Button, Badge } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { IProject } from '@/interfaces/project.interface';
import { useAppDispatch } from '@/modules/_partials/hooks/useRedux';
import {
  getProjectLead,
  getProjectUsers,
} from '@/redux/features/projects/projectsSlice';

type Project = {
  status: string;
  projectLeadId: string;
  projectLead: Record<string, any> | null;
  projectUsers: Record<string, any> | null;
} & IProject;

const Project = ({
  selected,
  setSelected,
  proj,
}: {
  selected: string;
  setSelected: (arr: string) => void;
  proj: Project;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!proj.projectLead && proj.projectLeadId) {
      dispatch(getProjectLead(proj.projectLeadId));
    }
    if (!proj.projectUsers) {
      dispatch(getProjectUsers(proj.id));
    }
  }, [proj]);

  const handleClick = (path: string, state: object) => {
    navigate(path, { state });
  };

  return (
    <div
      aria-hidden="true"
      className="w-72 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 group relative hover:cursor-pointer  hover:scale-105 duration-300"
      onClick={() => {
        if (selected !== proj.id) {
          return setSelected(proj.id);
        }
        return setSelected('');
      }}
    >
      <div
        className={`absolute group-hover:block left-2 top-2 w-3 h-3  border border-gray-300 rounded-full ${
          selected.indexOf(proj.id) !== -1
            ? 'bg-brand-blue block'
            : 'bg-transparent hidden'
        }`}
      />
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center capitalize">
        {proj.name.length > 25
          ? `${proj.name.substring(0, 25)}...`
          : proj.name}
      </h5>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 h-20">
        {proj.description.length > 90
          ? `${proj.description.substring(0, 90)}...`
          : proj.description}
      </p>
      {/* Dates */}
      <div className="flex justify-between dark:text-white text-sm">
        <p>
          Start:{' '}
          <span>{new Date(proj.startDate).toLocaleDateString()}</span>
        </p>
        <p>
          Due:{' '}
          <span>{new Date(proj.endDate).toLocaleDateString()}</span>
        </p>
      </div>
      <div className="my-3 flex justify-between">
        {/* project lead */}
        <div>
          <h2 className="text-sm font-medium dark:text-white">
            Project Lead
          </h2>

          <div className="flex items-center gap-3 mt-2">
            {proj?.projectLeadId ? (
              <img
                src={proj?.projectLead?.avatar}
                alt="user"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <small className="text-gray-500">
                No assigned lead
              </small>
            )}
            <span className="dark:text-white text-sm">
              {proj?.projectLead?.displayName}
            </span>
          </div>
        </div>
        {/* project assignees */}
        <div>
          <h2 className="text-sm font-medium dark:text-white">
            Assignees
          </h2>
          <div className="flex mt-2">
            {proj?.projectUsers?.length === 0 && (
              <small className="text-gray-500">No assignees</small>
            )}
            {proj?.projectUsers?.slice(0, 3).map((user: any) => {
              return (
                <img
                  key={user?.id}
                  src={user?.avatar}
                  alt={user?.displayName}
                  className="w-8 h-8 rounded-full -mr-3 border bg-gray-200"
                />
              );
            })}
            {proj?.projectUsers?.length > 3 ? (
              <span className="w-8 h-8 rounded-full dark:bg-slate-700 bg-slate-200 dark:text-white text-gray-900 inline-flex items-center justify-center text-xs font-bold ">
                +
                {proj?.projectUsers?.length &&
                  proj.projectUsers.length - 3}
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {/* actions */}
      <div className="flex justify-between items-center mt-6">
        {proj?.status !== 'completed' &&
          new Date(proj?.endDate) < new Date() && (
            <Badge color="failure">Overdue</Badge>
          )}
        {proj?.status === 'completed' && (
          <Badge color="green">Completed</Badge>
        )}
        {proj?.status === 'pending' &&
          new Date(proj?.endDate) > new Date() && (
            <Badge color="yellow">Pending</Badge>
          )}
        {proj?.status === 'in-progress' &&
          new Date(proj?.endDate) > new Date() && (
            <Badge color="info">In progress</Badge>
          )}
        <Button
          gradientDuoTone="cyanToBlue"
          type="submit"
          className="py-0 px-0"
          onClick={() =>
            handleClick(`/projects/${proj.id}`, { projId: proj.id })
          }
        >
          Details
          <MdArrowForwardIos className="h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Project;
