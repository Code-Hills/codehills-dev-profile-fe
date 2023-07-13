import { ChangeEvent, useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { CgSpinner } from 'react-icons/cg';

import SelectInput, {
  SelectOption,
} from '../Projects/partials/SelectInput';

import isAuth from '@/helpers/isAuth';
import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import {
  getSingleProject,
  updateProject,
  updatedProjectStatus,
} from '@/redux/features/projects/projectsSlice';

const UpdateProject = ({
  proj,
  setIsUpdating,
}: {
  proj: any;
  setIsUpdating: (arg: boolean) => void;
}) => {
  const authUser = isAuth();

  const [project, setProject] = useState(proj);
  const [fillError, setFillError] = useState('');
  const dispatch = useAppDispatch();
  const { isUpdating } = useAppSelector(state => state.projects);
  const [assignees, setAssignees] = useState<SelectOption[]>([]);
  const [projectLead, setProjectLead] = useState<
    SelectOption | undefined
  >(undefined);

  const handleChange = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    setProject({
      ...project,
      [target?.name]: target?.value.trimStart(),
    });
  };

  const handleSubmit = async () => {
    if (Object.values({ ...project, id: null }).includes('')) {
      setFillError('*Please fill out all required fields');
    } else if (
      project?.name?.length > 50 ||
      project?.name?.length < 5
    ) {
      setFillError('*Project name should be 5-50 characters long');
    } else if (
      project?.description?.length > 500 ||
      project?.description?.length < 10
    ) {
      setFillError(
        '*Project description should be 10-500 characters long',
      );
    } else if (new Date(project.startDate) <= new Date()) {
      setFillError('*Starting date should be valid!');
    } else if (new Date(project.endDate) <= new Date()) {
      setFillError('*Due date should be valid!');
    } else {
      setFillError('');
      if (authUser?.role === 'admin') {
        await dispatch(
          updateProject({ project, projectLead, assignees }),
        );
      } else {
        await dispatch(
          updatedProjectStatus({
            projectId: project.id,
            status: project.status,
          }),
        );
      }

      setProjectLead(undefined);
      setAssignees([]);
      setProject({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        id: '',
        status: '',
      });
      setIsUpdating(false);
      await dispatch(getSingleProject(project.id));
    }
  };
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return (
    <div className="fixed top-0 left-0  z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 w-full h-full flex justify-center items-center">
      <div className="relative w-full max-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="popup-modal"
            onClick={() => setIsUpdating(false)}
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
          <div className="space-y-3 px-6 pb-2 sm:pb-6 lg:px-8 xl:pb-4">
            <div className="flex justify-between items-center  pb-3">
              <h4 className="text-2xl mt-2">
                {' '}
                Update{' '}
                {authUser?.role === 'admin' ? 'Project' : 'Status'}
              </h4>
            </div>
            {authUser?.role === 'admin' && (
              <>
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1">
                    <div className="mb-2 block">
                      <Label htmlFor="name" value="Project Name*" />
                    </div>
                    <TextInput
                      id="name"
                      placeholder="Type project name"
                      required
                      name="name"
                      value={project.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 block">
                      <Label htmlFor="lead" value="Project lead" />
                    </div>
                    <SelectInput
                      onChange={opt => setProjectLead(opt)}
                      value={projectLead}
                      previousValue={project.projectLead}
                      placeholder="Change lead"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="start-date"
                        value="Start Date*"
                      />
                    </div>
                    <TextInput
                      id="start-date"
                      type="date"
                      min={new Date(date).toISOString().slice(0, 10)}
                      required
                      name="startDate"
                      value={
                        project.startDate
                          ? new Date(project.startDate)
                              .toISOString()
                              .slice(0, 10)
                          : ''
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 block">
                      <Label htmlFor="due-date" value="Due Date*" />
                    </div>
                    <TextInput
                      id="due-date"
                      type="date"
                      required
                      name="endDate"
                      value={
                        project.endDate
                          ? new Date(project.endDate)
                              .toISOString()
                              .slice(0, 10)
                          : ''
                      }
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="assignees" value="Assignees" />
                  </div>
                  <SelectInput
                    multiple
                    onChange={opt => setAssignees(opt)}
                    value={assignees}
                    previousValue={project.projectUsers}
                    placeholder="Add more assignees"
                  />
                </div>
              </>
            )}

            {authUser?.role !== 'admin' && (
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Change Status" />
                </div>
                <select
                  id="status"
                  name="status"
                  value={project.status}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-slate-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-100 dark:focus:border-slate-100  block w-full    rounded-md outline-none   focus:border-slate-100 p-2"
                  onChange={handleChange}
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In progress</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            )}
            {authUser?.role === 'admin' && (
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Description*" />
                </div>
                <Textarea
                  id="description"
                  placeholder="Describe the project..."
                  required
                  rows={2}
                  name="description"
                  value={project.description}
                  onChange={handleChange}
                />
              </div>
            )}
            {fillError && (
              <div className="text-red-500 my-0.5">{fillError}</div>
            )}

            <div>
              <Button
                gradientDuoTone="cyanToBlue"
                onClick={handleSubmit}
                disabled={isUpdating}
              >
                {isUpdating && (
                  <CgSpinner className="animate-spin w-5 h-5 -ml-2 mr-1" />
                )}
                Update{' '}
                {authUser?.role === 'admin' ? 'Project' : 'Status'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateProject;
