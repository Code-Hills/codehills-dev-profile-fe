import { ChangeEvent, useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { MdAdd, MdArrowLeft } from 'react-icons/md';
import { CgSpinner } from 'react-icons/cg';

import SelectInput, { SelectOption } from './SelectInput';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { createProject } from '@/redux/features/projects/projectsSlice';
import { IProject } from '@/interfaces/project.interface';

const AddProject = () => {
  const [fillError, setFillError] = useState('');
  const [project, setProject] = useState<IProject>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    id: '',
    status: 'pending',
  });
  const dispatch = useAppDispatch();
  const { isCreating } = useAppSelector(state => state.projects);
  const navigate = useNavigate();
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
    if (
      Object.values({ ...project, id: null }).includes('') ||
      !projectLead ||
      assignees.length === 0
    ) {
      setFillError('*Please fill out all the above fields');
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
      await dispatch(
        createProject({ project, projectLead, assignees }),
      );
      setProject({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        id: '',
        status: 'pending',
      });
      setProjectLead(undefined);
      setAssignees([]);
      navigate('/projects');
    }
  };

  return (
    <div className="space-y-3 px-6 pb-2 sm:pb-6 lg:px-8 xl:pb-4">
      <div className="flex justify-between items-center  pb-3">
        <h4 className="text-2xl">Add project</h4>
        <button
          type="button"
          className="inline-flex items-center py-1 px-2  rounded-md bg-gray-300/40 hover:bg-gray-300/60 dark:bg-gray-800/25 dark:hover:bg-gray-800/80"
          onClick={() => navigate('/projects')}
        >
          <MdArrowLeft className="w-8 h-8 -ml-2" />
          Back
        </button>
      </div>
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
            <Label htmlFor="lead" value="Project lead*" />
          </div>
          <SelectInput
            onChange={opt => setProjectLead(opt)}
            value={projectLead}
            placeholder="Choose lead"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex-1">
          <div className="mb-2 block">
            <Label htmlFor="start-date" value="Start Date*" />
          </div>
          <TextInput
            id="start-date"
            type="date"
            required
            name="startDate"
            value={project.startDate}
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
            value={project.endDate}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="assignees" value="Assignees*" />
        </div>
        <SelectInput
          multiple
          onChange={opt => setAssignees(opt)}
          value={assignees}
          placeholder="Choose assignees"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description*" />
        </div>
        <Textarea
          id="description"
          placeholder="Describe the project..."
          required
          rows={3}
          name="description"
          value={project.description}
          onChange={handleChange}
        />
      </div>
      {fillError && (
        <div className="text-red-500 my-0.5">{fillError}</div>
      )}

      <div>
        <Button
          gradientDuoTone="cyanToBlue"
          onClick={handleSubmit}
          disabled={isCreating}
        >
          {isCreating ? (
            <CgSpinner className="animate-spin w-5 h-5 -ml-2 mr-1" />
          ) : (
            <MdAdd className="w-5 h-5 -ml-2 mr-1" />
          )}
          Add Project
        </Button>
      </div>
    </div>
  );
};
export default AddProject;
