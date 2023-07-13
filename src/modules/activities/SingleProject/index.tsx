import { useEffect, useState } from 'react';
import { Button, Badge } from 'flowbite-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import UpdateProject from './UpdateProject';

import {
  useAppSelector,
  useAppDispatch,
} from '@/modules/_partials/hooks/useRedux';
import isAuth from '@/helpers/isAuth';
import { getAllUsers } from '@/redux/features/users/userSlice';
import {
  deleteProjects,
  getSingleProject,
  deleteAssignee,
} from '@/redux/features/projects/projectsSlice';
import SkeletonElement from '@/modules/_partials/shared/SkeletonElement';

const SingleProjectActivity = () => {
  const authUser = isAuth();
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const { isLoading, error, singleProject } = useAppSelector(
    state => state.projects,
  );
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getSingleProject(projectId));
  }, [projectId]);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (projId: string) => {
    await dispatch(deleteProjects(projId));
    setOpen(false);
    navigate('/projects');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col  dark:bg-gray-900 relative my-10 lg:mx-16">
        <SkeletonElement className="font-semibold text-3xl dark:text-white p-4  lg:w-1/3 mb-12" />
        <SkeletonElement className="font-semibold text-3xl dark:text-white p-4 lg:w-1/4 mb-5" />
        <SkeletonElement className="font-semibold text-3xl dark:text-white p-8 lg:w-3/6 mb-6" />
        <div className="flex gap-x-6 mb-3">
          <SkeletonElement className="font-semibold text-3xl dark:text-white p-3 w-full lg:w-1/6 " />
          <SkeletonElement className="font-semibold text-3xl dark:text-white p-3 w-full lg:w-1/6 " />
        </div>
        <SkeletonElement className="font-semibold text-3xl dark:text-white p-4 w-1/2 lg:w-1/6 mb-3" />
        <div className="flex gap-x-6">
          <SkeletonElement className="font-semibold text-3xl dark:text-white p-5 lg:w-1/12 mb-4 rounded-md" />
          <SkeletonElement className="font-semibold text-3xl dark:text-white p-5 lg:w-1/12 mb-4 rounded-md" />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="mt-10 gap-4 flex flex-col items-center">
        <h3 className="text-2xl font-semibold">Project Not Found</h3>
        <Link
          to="/projects"
          className="bg-brand-blue text-white font-bold rounded px-6 py-3 hover:bg-blue-700 transition-colors duration-200"
        >
          Go back to projects
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col  dark:bg-gray-900 relative my-4">
      <h1 className="font-semibold text-3xl dark:text-white pt-4 px-4 lg:px-14">
        {singleProject?.name}
      </h1>

      <div className="lg:px-10 my-8 flex flex-col items-center lg:flex-row gap-12">
        <div className="lg:flex-[3] self-stretch lg:self-start px-4 py-2">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            Description
          </h3>
          <p className="mb-6 font-normal text-gray-500 dark:text-gray-400 lg:w-11/12 relative whitespace-pre-wrap">
            {singleProject?.description}
          </p>
          {/* Dates */}
          <div className="flex gap-x-12 dark:text-white text-sm gap-4">
            <div className="flex gap-3">
              <p className="font-bold">Start:</p>
              <p>
                {new Date(
                  singleProject?.startDate,
                ).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3">
              <p className="font-bold">Due:</p>
              <p>
                {new Date(
                  singleProject?.endDate,
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
          {/* Project status */}
          <div className="flex gap-3 my-4">
            <p className="font-bold">Status:</p>
            {singleProject?.status !== 'completed' &&
              new Date(singleProject?.endDate) < new Date() && (
                <Badge color="failure">Overdue</Badge>
              )}
            {singleProject?.status === 'completed' && (
              <Badge color="green">Completed</Badge>
            )}
            {singleProject?.status === 'pending' &&
              new Date(singleProject?.endDate) > new Date() && (
                <Badge color="yellow">Pending</Badge>
              )}
            {singleProject?.status === 'in-progress' &&
              new Date(singleProject?.endDate) > new Date() && (
                <Badge color="info">In progress</Badge>
              )}
          </div>
          {/* buttons */}
          {authUser.role !== 'developer' && (
            <div className="flex items-center gap-6 mt-10">
              {(authUser?.role === 'admin' ||
                authUser.id === singleProject.projectLeadId) && (
                <Button
                  gradientDuoTone="cyanToBlue"
                  type="submit"
                  onClick={() => setIsUpdating(true)}
                >
                  <svg
                    aria-hidden="true"
                    className="mr-1 -ml-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Edit {authUser?.role === 'architect' && 'status'}
                </Button>
              )}
              {authUser?.role === 'admin' && (
                <Button
                  gradientMonochrome="failure"
                  type="submit"
                  onClick={() => setOpen(true)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 mr-1.5 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delete
                </Button>
              )}
              <div
                className={`fixed top-0 left-0 ${
                  !open && 'hidden'
                } right-0 z-50  p-4 overflow-x-hidden overflow-y-auto lg:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center`}
              >
                <div className="relative w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      data-modal-hide="popup-modal"
                      onClick={() => setOpen(!open)}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                      <svg
                        aria-hidden="true"
                        className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this project?
                      </h3>
                      <Button
                        type="button"
                        gradientMonochrome="failure"
                        className="text-sm inline-flex items-center text-center mr-2"
                        onClick={() => handleDelete(singleProject.id)}
                      >
                        Yes, I&apos;m sure
                      </Button>
                      <button
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        onClick={() => setOpen(!open)}
                      >
                        No, cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {isUpdating ? (
          <UpdateProject
            proj={singleProject}
            setIsUpdating={setIsUpdating}
          />
        ) : (
          ''
        )}
        <div className="lg:flex-[1.5] self-start px-4 flex flex-col gap-y-4">
          <div>
            <div className="relative">
              <div
                aria-hidden="true"
                className="flex justify-between gap-5"
              >
                <h2 className="text-sm font-semibold dark:text-white">
                  Project Lead
                </h2>
              </div>
              <div className="flex items-center gap-5 mt-4">
                {singleProject.projectLead ? (
                  <>
                    <img
                      src={singleProject?.projectLead?.avatar}
                      alt="user"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-500 dark:text-gray-400 font-semibold">
                      {singleProject?.projectLead?.displayName}
                      <small className="ml-2">
                        ({singleProject?.projectLead?.firstName}{' '}
                        {singleProject?.projectLead?.lastName})
                      </small>
                    </span>
                  </>
                ) : (
                  <small className="text-gray-500">
                    No project lead yet
                  </small>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="relative">
              <div
                aria-hidden="true"
                className="flex justify-between gap-5"
              >
                <h2 className="text-sm font-semibold dark:text-white">
                  Assignees
                </h2>
              </div>
              <div className="flex flex-col mt-4 gap-2">
                {singleProject?.projectUsers?.length > 0 ? (
                  singleProject?.projectUsers?.map((user: any) => {
                    return (
                      <div
                        key={user?.id}
                        className={`flex ${
                          authUser?.role === 'admin' &&
                          'cursor-pointer'
                        } items-center justify-between group  p-1`}
                      >
                        <div className="flex items-center  gap-5">
                          <img
                            src={user.avatar}
                            alt="user"
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-gray-500 dark:text-gray-400 font-semibold">
                            {user.displayName}
                            <small className="ml-2">
                              ({user.firstName})
                            </small>
                          </span>
                        </div>
                        {authUser?.role === 'admin' && (
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 hidden group-hover:block text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() =>
                              dispatch(
                                deleteAssignee({
                                  projectId,
                                  assigneeEmail: user?.email,
                                }),
                              )
                            }
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <small className="text-gray-500">
                    No assignees yet
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProjectActivity;
