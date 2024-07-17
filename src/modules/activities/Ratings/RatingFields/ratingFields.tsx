import { useState, useEffect, useRef } from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';
import { HiOutlineX } from 'react-icons/hi';
import { Button } from 'flowbite-react';
import { toast } from 'react-toastify';

import RecievedRatings from '../Rating/recievedRatings';

import NewRatingFields from './newRatingFields';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import TableDataLoader from '@/modules/_partials/shared/TableDataLoader';
import {
  deleteFields,
  getAllRatingFields,
} from '@/api/ratingFields.api';
import { getAllRatings } from '@/api/rating.api';
import type { RatingFields } from '@/interfaces/ratingFields.interface';

const RatingFields = () => {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { ratingFields, loading: isLoadingRatings } = useAppSelector(
    state => state.ratingField,
  );
  const { name } = useAppSelector(state => state.ratings);
  const [selectedRating, setSelectedRating] = useState(null);
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    dispatch(getAllRatingFields());
    dispatch(getAllRatings());
  }, [dispatch]);

  useEffect(() => {
    const map: { [key: string]: string } = {};
    name.forEach(rating => {
      map[rating.id] = rating.name;
    });
    setCategoryName(map);
  }, [name]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenItemId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEditClick = (rating: any) => {
    setSelectedRating(rating);
  };

  const handleDelete = async (ratingId: any) => {
    try {
      await dispatch(deleteFields(ratingId));
      dispatch(getAllRatingFields());
      dispatch(getAllRatings());
    } catch (error) {
      toast.error('An error occurred while deleting the rating.');
    }
  };

  const handleToggleOpen = (itemId: string) => {
    if (openItemId === itemId) {
      setOpenItemId(null);
    } else {
      setOpenItemId(itemId);
    }
  };

  const handleModalClose = () => {
    setSelectedRating(null);
  };

  return (
    <div>
      <div className="flex lg:flex-row flex-col justify-between">
        <div className="lg:w-[50%] w-full">
          <div className="flex justify-between pb-10">
            <h1 className="text-2xl font-medium">
              Available Ratings Fields
            </h1>
            <NewRatingFields onClose={handleModalClose}>
              <Button gradientDuoTone="cyanToBlue" type="button">
                <MdAdd
                  className="w-6 h-6 md:-ml-3"
                  fill="currentColor"
                />
                <span className="hidden md:inline">
                  New Rating Field
                </span>
              </Button>
            </NewRatingFields>
          </div>

          <div className="overflow-x-auto rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                      >
                        Rating category
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs whitespace-nowrap font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800">
                    <TableDataLoader
                      isLoading={
                        isLoadingRatings && !ratingFields.length
                      }
                      colSpan={5}
                      data={ratingFields}
                    >
                      {ratingFields.map((ratingField, index) => (
                        <tr
                          key={ratingField.id}
                          className="even:bg-gray-100 dark:even:bg-gray-700"
                        >
                          <td className="capitalize font-bold p-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {index + 1}
                          </td>
                          <td className="p-4 font-bold whitespace-nowrap">
                            {ratingField.name}
                          </td>
                          <td className="capitalize font-bold p-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {categoryName[ratingField.categoryId]}
                          </td>
                          <td className="relative px-6 py-4">
                            <button
                              onClick={() =>
                                handleToggleOpen(ratingField.id)
                              }
                              className="inline-flex items-center p-2 font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                              type="button"
                            >
                              <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                              </svg>
                            </button>

                            {openItemId === ratingField.id && (
                              <div
                                ref={dropdownRef}
                                className="z-50 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 top-[-3rem] right-0 mt-0"
                              >
                                <ul
                                  className="py-2 w-full text-sm text-gray-700 dark:text-gray-200"
                                  aria-labelledby="dropdownMenuIconHorizontalButton"
                                >
                                  <li className="hover:bg-gray-300 dark:hover:bg-gray-600 ">
                                    <button
                                      onClick={() =>
                                        handleEditClick(ratingField)
                                      }
                                      type="button"
                                      className="text-blue-600 block px-4 py-2 dark:hover:text-white"
                                    >
                                      Edit
                                    </button>
                                  </li>
                                  <li className="hover:bg-gray-300 dark:hover:bg-gray-600 ">
                                    <button
                                      onClick={() =>
                                        handleDelete(ratingField.id)
                                      }
                                      className="text-red-600 block px-4 py-2 dark:hover:text-red-600"
                                      type="button"
                                    >
                                      Delete
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </TableDataLoader>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {selectedRating && (
            <NewRatingFields onClose={handleModalClose} />
          )}
        </div>
        <RecievedRatings />
      </div>
    </div>
  );
};

export default RatingFields;
