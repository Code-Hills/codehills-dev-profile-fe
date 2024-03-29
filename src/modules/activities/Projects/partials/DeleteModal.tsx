import { Button } from 'flowbite-react';
import { FiInfo } from 'react-icons/fi';
import { CgSpinner } from 'react-icons/cg';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { deleteProjects } from '@/redux/features/projects/projectsSlice';

const DeleteModal = ({
  openDelete,
  setOpenDelete,
  selected,
  setSelected,
}: {
  openDelete: boolean;
  setOpenDelete: (arg: boolean) => void;
  selected: string;
  setSelected: (arg: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const { isDeleting, deleteError } = useAppSelector(
    state => state.projects,
  );

  const handleDelete = async (evt: any) => {
    evt.preventDefault();
    await dispatch(deleteProjects(selected));
    setSelected('');
    setOpenDelete(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 ${
        !openDelete && 'hidden'
      } right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center`}
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="popup-modal"
            onClick={() => setOpenDelete(!openDelete)}
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
            <FiInfo
              className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
              fill="none"
            />

            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete the project(s)?
            </h3>
            <Button
              type="button"
              gradientMonochrome="failure"
              className="text-sm inline-flex items-center text-center font-medium mr-2"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting && (
                <CgSpinner className="animate-spin w-5 h-5 -ml-2 mr-1" />
              )}
              Yes, I&apos;m sure
            </Button>
            <button
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => {
                setOpenDelete(!openDelete);
                setSelected('');
              }}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
