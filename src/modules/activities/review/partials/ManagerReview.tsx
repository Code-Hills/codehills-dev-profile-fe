/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Modal, Select, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { createReview } from '@/api/review.api';
import { getAllRatingFields } from '@/api/ratingFields.api';
import { getAllRatings } from '@/api/rating.api';

const ManagerReview = ({
  title = 'Add Manager Review',
  developerId,
}: {
  title?: string;
  developerId?: string;
}) => {
  const dispatch = useAppDispatch();

  const { name } = useAppSelector(state => state.ratings);
  const { loading } = useAppSelector(state => state.review);
  const { tokenData } = useAppSelector(state => state.profile);
  const { activeCycle } = useAppSelector(state => state.cycle);
  const [show, setShow] = useState(false);
  const writtenReviewRef = React.useRef<HTMLTextAreaElement>(null);
  const ratingRef = React.useRef<HTMLSelectElement>(null);
  const [selectedCategoryField, setSelectedCategoryField] = useState<any>('');
  const [selectedCategory, setSelectedCategory] = useState<any>({});

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const userId = tokenData?.id;

    if (activeCycle) {
      const description = writtenReviewRef?.current?.value;
      const ratings = Number(ratingRef?.current?.value);

      if (!description || !ratings) {
        return;
      }
      const { payload } = await dispatch(
        createReview({
          description: selectedCategoryField,
          ratings: selectedCategory,
          reviewCycleId: activeCycle.id,
          revieweeId: developerId || userId,
        }),
      );

      if (payload) {
        setShow(false);
        writtenReviewRef.current.value = '';
        ratingRef.current!.value = '1';
      }
    }
  };

  const onClose = () => {
    if (!loading) {
      setShow(false);
    }
  };

  useEffect(() => {
    dispatch(getAllRatingFields());
    dispatch(getAllRatings());
  }, [dispatch]);

  const handleSelectCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCat = name?.find((item: { name: string }) => item?.name === event.target.value)
    setSelectedCategory(selectedCat);
  };

  const handleSelectFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryField(event.target.value)
  };

  return (
    <>
      <Button
        size="xs"
        gradientMonochrome="success"
        onClick={() => setShow(!show)}
      >
        Manager Review
      </Button>
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
                Select review
              </label>
              <Select
                className="flex-grow mr-4"
                ref={ratingRef}
                onChange={handleSelectCategoryChange}
                required
              >
                <option value="" disabled selected hidden>
                  Select a category
                </option>
                {name.map(item => (
                  <option value={item.name}>{item.name}</option>
                ))}
              </Select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-400 font-medium mb-2">
                Performance rating
              </label>
              <div className="flex items-center">
                <Select
                  className="flex-grow mr-4"
                  ref={ratingRef}
                  onChange={handleSelectFieldChange}
                  required
                >
                  <option value="" disabled selected hidden>
                    Select a field
                  </option>
                  {selectedCategory?.ratingFields?.map((item: any) => (
                    <option value={item.name}>{item.name}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                disabled={loading}
                gradientMonochrome="info"
                type="submit"
                isProcessing={loading}
              >
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ManagerReview;
