import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { MdAdd, MdDelete } from 'react-icons/md';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import NewRatings from './newRatings';

import { getAllRatings, deleteRating } from '@/api/rating.api';
import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';

const RecievedRatings = () => {
  const { name, loading: isLoadingRatings } = useAppSelector(
    state => state.ratings,
  );
  const dispatch = useAppDispatch();
  const [selectedRating, setSelectedRating] = useState(null);
  const [openItemIds, setOpenItemIds] = useState<string[]>([]);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    dispatch(getAllRatings());
  }, [dispatch]);

  const handleEditClick = (rating: any) => {
    setSelectedRating(rating);
  };

  const handleDelete = async (ratingId: any): Promise<any> => {
    try {
      await dispatch(deleteRating(ratingId));
      dispatch(getAllRatings());
    } catch (error) {
      return error;
    }
  };

  const handleToggleOpen = (itemId: string) => {
    if (openItemIds.includes(itemId)) {
      setOpenItemIds(openItemIds.filter(id => id !== itemId));
    } else {
      setOpenItemIds([...openItemIds, itemId]);
    }
  };

  const handleModalClose = () => {
    setSelectedRating(null);
  };

  return (
    <div className="lg:w-[40%]  w-full dark:ring-0 mx-auto dark:bg-gray-700 bg-brand-blue-light rounded-md ring-1 ring-gray-300 mt-[84px]">
      <div className="px-[20px] py-[6px] flex items-center justify-between text-xl font-bold">
        <h1>Rating Categories</h1>
        <NewRatings onClose={handleModalClose}>
          <Button gradientDuoTone="cyanToBlue" type="button">
            <MdAdd className="w-6 h-6 md:-ml-3" fill="currentColor" />
            <span className="hidden md:inline">
              New Rating Category
            </span>
          </Button>
        </NewRatings>
      </div>
      {isLoadingRatings ? (
        <div>Loading....</div>
      ) : (
        <>
          {name.map(item => (
            <div
              className="flex py-[8px] items-start px-[20px] justify-between w-[100%]"
              key={item.id}
              onMouseEnter={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
            >
              <div className="dark:bg-gray-800 bg-white rounded-md py-[6px] px-[20px] w-[100%]">
                <div className="flex items-center justify-between">
                  <p>{item.name}</p>
                  <div className="flex items-center">
                    <Button
                      outline
                      pill
                      className="ml-3 transition-all duration-300 ease-in"
                      size="xs"
                      onClick={() => handleEditClick(item)}
                    >
                      <HiPencil className="h-6 w-6" />
                    </Button>
                    <Button
                      className="ml-3 bg-white transition-all duration-300 ease-in py-[6px] hover:bg-none cursor-pointer"
                      size="xs"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDelete className="h-6 w-6 text-red-600" />
                    </Button>
                  </div>
                </div>

                {item.ratingFields &&
                  item.ratingFields.length > 0 && (
                    <div className="mt-2">
                      <button
                        onClick={() => handleToggleOpen(item.id)}
                        type="button"
                        className={`flex items-center ${
                          hoveredItemId === item.id ? 'block' : 'none'
                        } transition-all duration-300`}
                      >
                        {openItemIds.includes(item.id) ? (
                          <FaChevronUp className="text-sm mr-2" />
                        ) : (
                          <FaChevronDown className="text-sm mr-2" />
                        )}
                        <span>Associated rating Fields</span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openItemIds.includes(item.id)
                            ? 'max-h-96'
                            : 'max-h-0'
                        }`}
                      >
                        <div className="mt-2 ml-4">
                          {item.ratingFields.map((rating, index) => (
                            <div className="flex gap-2" key={index}>
                              <span className="font-bold">
                                {index + 1}.
                              </span>
                              <p>{rating.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ))}
          {selectedRating && (
            <NewRatings
              ratings={selectedRating}
              onClose={handleModalClose}
            />
          )}
        </>
      )}
    </div>
  );
};

export default RecievedRatings;
