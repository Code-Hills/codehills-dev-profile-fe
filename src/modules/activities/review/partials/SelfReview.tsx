/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Button,
  Modal,
  Select,
  Textarea,
  TextInput,
} from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { createReview } from '@/api/review.api';
import { getAllRatingFields } from '@/api/ratingFields.api';
import { getAllRatings } from '@/api/rating.api';

const SelfReview = ({
  title = 'Self Review',
  className = 'px-3 py-1.5 text-xs font-medium',
  developerId,
}: {
  title?: string;
  className?: string;
  developerId?: string;
}) => {
  const dispatch = useAppDispatch();

  const { ratingFields, loading: isLoadingRatings } = useAppSelector(
    state => state.ratingField,
  );
  const { name } = useAppSelector(state => state.ratings);

  const { loading } = useAppSelector(state => state.review);
  const { tokenData } = useAppSelector(state => state.profile);
  const { activeCycle } = useAppSelector(state => state.cycle);
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const writtenReviewRef = React.useRef<HTMLTextAreaElement>(null);
  const ratingRef = React.useRef<HTMLSelectElement>(null);
  const [_, setUpdate] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoryFields, setCategoryFields] = useState<any>([]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    dispatch(getAllRatingFields());
    dispatch(getAllRatings());
  }, [dispatch]);

  const handleRatingChange = () => {
    setUpdate(prev => !prev);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const userId = tokenData?.id;

    if (activeCycle) {
      const data = {
        comment: writtenReviewRef?.current?.value || '',
        fieldReviews: categoryFields,
        reviewCycleId: activeCycle.id,
        revieweeId: developerId || userId,
      };

      const { payload } = await dispatch(createReview(data));

      if (payload) {
        setShow(false);
        writtenReviewRef!.current!.value = '';
        ratingRef!.current!.value = '1';
        setCurrentFieldIndex(0);
        setCurrentIndex(0);
        setIsSubmit(false);
      }
    }
  };

  const handleNext = async () => {
    if (
      currentFieldIndex <
      currentCategory!.ratingFields!.length - 1
    ) {
      const data = {
        ratingFieldId:
          currentCategory?.ratingFields[currentFieldIndex]?.id,
        ratings: Number(ratingRef?.current?.value),
      };
      setCategoryFields((prevFields: any) => [...prevFields, data]);
      setCurrentFieldIndex(currentFieldIndex + 1);
      ratingRef.current!.value = '1';
    } else {
      const data = {
        ratingFieldId:
          currentCategory?.ratingFields[currentFieldIndex]?.id,
        ratings: Number(ratingRef?.current?.value),
      };
      setCategoryFields((prevFields: any) => [...prevFields, data]);
      setCurrentIndex(currentIndex + 1);
      if (currentIndex + 1 !== name.length) {
        setCurrentFieldIndex(0);
        ratingRef.current!.value = '1';
      }
    }
  };

  useEffect(() => {
    if (currentIndex < name.length) {
      setCurrentCategory(name[currentIndex]);
    } else {
      setIsSubmit(true);
    }
  }, [currentIndex]);

  const onClose = () => {
    if (!loading) {
      setShow(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShow(!show)}
        className={`inline-flex items-center rounded-lg bg-blue-700 text-center text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-900 ${className}`}
      >
        {title}
      </button>
      <Modal show={show} size="xl" popup onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <h2 className="text-lg font-medium mb-2">{title}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                id="self-review"
                htmlFor="self-review"
                className="block text-gray-700 dark:text-gray-400 font-medium mb-2"
              >
                Written review
              </label>
              <Textarea
                id="self-review"
                className="w-full h-24 px-3 py-2 resize-none"
                placeholder="Write self review here..."
                ref={writtenReviewRef}
                required
              />
            </div>
            <div className="mb-4">
              <label
                id="self-review"
                htmlFor="self-review"
                className="block text-gray-700 dark:text-gray-400 font-medium mb-2"
              >
                Review category
              </label>
              <TextInput
                id="rating-name"
                type="text"
                className="w-full z-50"
                placeholder="Enter rating field name"
                name="name"
                value={currentCategory.name}
                ref={inputRef}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-400 font-medium mb-2">
                Review category field
              </label>
              <div className="flex items-center">
                <TextInput
                  id="rating-name"
                  type="text"
                  className="w-full z-50"
                  placeholder="Enter rating field name"
                  name="name"
                  value={
                    currentCategory?.ratingFields
                      ? currentCategory?.ratingFields[
                          currentFieldIndex
                        ]?.name
                      : ''
                  }
                  ref={inputRef}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-400 font-medium mb-2">
                Performance rating
              </label>
              <div className="flex items-center">
                <Select
                  className="flex-grow mr-4"
                  ref={ratingRef}
                  required
                  onChange={handleRatingChange}
                >
                  <option value="1">Delivered too poorly</option>
                  <option value="2">
                    Delivered below expectation but could
                    intermittently deliver good work
                  </option>
                  <option value="3">Met expectations</option>
                  <option value="4">Delivered excellently</option>
                  <option value="5">Went beyond expectations</option>
                </Select>
                <span className="text-gray-700 dark:text-gray-400 whitespace-nowrap">
                  ({ratingRef.current?.value || 'N/A'} out of 5)
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              {!isSubmit && (
                <Button
                  disabled={loading}
                  gradientMonochrome="info"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
              {isSubmit && (
                <Button
                  disabled={loading}
                  gradientMonochrome="info"
                  type="submit"
                  isProcessing={loading}
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SelfReview;
