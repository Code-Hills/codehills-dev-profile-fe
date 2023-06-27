/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Modal, Select, Textarea } from 'flowbite-react';
import React, { useState } from 'react';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { createReview } from '@/api/review.api';

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
  const { loading } = useAppSelector(state => state.review);
  const { tokenData } = useAppSelector(state => state.profile);
  const { activeCycle } = useAppSelector(state => state.cycle);
  const [show, setShow] = useState(false);
  const writtenReviewRef = React.useRef<HTMLTextAreaElement>(null);
  const ratingRef = React.useRef<HTMLSelectElement>(null);

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
          description,
          ratings,
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
              <label className="block text-gray-700 dark:text-gray-400 font-medium mb-2">
                Performance rating
              </label>
              <div className="flex items-center">
                <Select
                  className="flex-grow mr-4"
                  ref={ratingRef}
                  required
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
                  ({ratingRef.current?.value} out of 5)
                </span>
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

export default SelfReview;
