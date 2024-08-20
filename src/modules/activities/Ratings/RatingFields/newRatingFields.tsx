/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Modal, TextInput } from 'flowbite-react';
import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import {
  createFields,
  getAllRatingFields,
  updateFields,
} from '@/api/ratingFields.api';
import { RatingFields } from '@/interfaces/ratingFields.interface';
import { getAllRatings } from '@/api/rating.api';

const NewRatingFields = ({
  title = 'Create Rating Category',
  children,
  ratingFields,
  onClose,
}: {
  title?: string;
  children?: React.ReactNode;
  ratingFields?: RatingFields;
  onClose?: () => void;
}) => {
  const [ratingField, setRatingFields] = useState({
    name: '',
    categoryId: '',
  });
  const dispatch = useAppDispatch();
  const { loading, name: ratingOptions } = useAppSelector(
    state => state.ratings,
  );
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(getAllRatingFields());
  }, [dispatch]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!ratingField.name) {
      toast.error('Please Insert rating name');
      return;
    }
    let result: any = null;
    if (ratingFields) {
      const { payload } = await dispatch(
        updateFields({
          id: ratingFields.id,
          name: ratingFields.name,
          categoryId: ratingField.categoryId,
        }),
      );
      result = payload;
    } else {
      const { payload } = await dispatch(
        createFields({
          name: ratingField.name,
          categoryId: ratingField.categoryId,
        }),
      );
      result = payload;
    }

    if (result) {
      setShow(false);
      setRatingFields({
        name: '',
        categoryId: '',
      });
      dispatch(getAllRatings());
      if (onClose) onClose();
    }
  };

  const handleModalClose = () => {
    if (!loading) {
      setShow(false);
      if (onClose) onClose();
    }
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setRatingFields(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (ratingFields) {
      setRatingFields({
        name: ratingFields.name,
        categoryId: ratingFields.categoryId,
      });
      setShow(true);
    }
  }, [ratingFields]);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show, ratingField]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setShow(!show)}
        onKeyDown={() => setShow(!show)}
      >
        {children}
      </div>
      <Modal show={show} size="xl" popup onClose={handleModalClose}>
        <Modal.Header />
        <Modal.Body>
          <h2 className="text-lg font-medium mb-6">
            {ratingFields
              ? 'Update Rating field'
              : 'Create Rating Field'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="rating-name"
                className="block text-gray-700 dark:text-gray-400 font-medium mb-2"
              >
                Rating Field Name
              </label>
              <TextInput
                id="rating-name"
                type="text"
                className="w-full z-50"
                placeholder="Enter rating field name"
                name="name"
                onChange={onChangeInput}
                value={ratingField.name}
                ref={inputRef}
              />
            </div>
            <div className="mb-4 flex flex-col ">
              <label
                htmlFor="rating-select"
                className="block text-gray-700 dark:text-gray-400 font-medium mb-2 mr-4"
              >
                Select Rating
              </label>
              <select
                id="rating-select"
                className="flex-grow dark:bg-gray-700 dark:text-white text-base placeholder-gray-600 border rounded-lg focus:ring-1 focus:outline-none border-gray-600"
                name="categoryId"
                onChange={onChangeInput}
                value={ratingField.categoryId}
              >
                <option
                  value=""
                  disabled
                  className="cursor-pointer dark:text-gray-400"
                >
                  Please select a rating
                </option>
                {ratingOptions.map(rating => (
                  <option
                    key={rating.id}
                    value={rating.id}
                    className="cursor-pointer dark:text-gray-400"
                  >
                    {rating.name}
                  </option>
                ))}
              </select>
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

export default NewRatingFields;
