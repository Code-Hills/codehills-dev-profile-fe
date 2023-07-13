import { useRef, useState } from 'react';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';

import DeleteModal from './DeleteModal';
import Filters from './Filters';
import { ContainerProps } from './ProjectsContainer';

import isAuth from '@/helpers/isAuth';

type ProjectHeaderProps = {
  setFilteredProjects: (arg: string | undefined) => void;
} & ContainerProps;

const ProjectHeader = ({
  selected,
  setSelected,
  filteredProjects,
  setFilteredProjects,
}: ProjectHeaderProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const authUser = isAuth();
  return (
    <div className={`${authUser.role !== 'admin' && 'hidden'}`}>
      <div className="my-2 flex items-center px-8">
        <h1 className="font-semibold text-center md:text-left text-2xl md:text-3xl dark:text-white flex-1">
          Projects{' '}
          <span className="text-gray-500">
            {filteredProjects?.length} Result(s)
          </span>
        </h1>
        <div className="fixed z-40 bottom-3 right-3 md:static flex flex-col-reverse md:flex-row gap-y-2 gap-x-6">
          <Button
            gradientDuoTone="cyanToBlue"
            type="submit"
            onClick={() => navigate('new')}
            className={`${
              selected.length === 0 ? 'block' : 'hidden'
            } md:block`}
          >
            <MdAdd className="w-6 h-6 md:-ml-3" fill="currentColor" />
            <span className="hidden md:inline">Add</span>
          </Button>
          {selected.length > 0 && (
            <Button
              gradientMonochrome="failure"
              type="submit"
              onClick={() => setOpenDelete(true)}
            >
              <RiDeleteBin6Fill
                className="w-6 h-6 mr-1.5 md:-ml-1"
                fill="currentColor"
              />
              <span className="hidden md:inline">Delete</span>
            </Button>
          )}
          <DeleteModal
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
      <div className="sticky top-0 z-30 dark:bg-gray-900 bg-[#e8eafb] shadow-md">
        <div className="py-2 px-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdSearch className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              className="block p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3"
              placeholder="Search for projects"
              ref={inputRef}
              onChange={() => {
                setFilteredProjects(inputRef?.current?.value);
              }}
            />
          </div>
        </div>
        <hr className="w-full border border-white dark:border-gray-700 my-2" />
        {/* Filtering */}
        <Filters setFilteredProjects={setFilteredProjects} />
      </div>
    </div>
  );
};

export default ProjectHeader;
