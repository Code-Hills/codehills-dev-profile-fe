import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button, Modal, TextInput } from 'flowbite-react';
import { toast } from 'react-toastify';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import {
  createRating,
  getAllRatings,
  updateRating,
} from '@/api/rating.api';
import { Ratings } from '@/interfaces/rating.interface';

const NewRatings = ({
  title = 'Create Rating Category',
  children,
  ratings,
  onClose,
}: {
  title?: string;
  children?: React.ReactNode;
  ratings?: Ratings;
  onClose?: () => void;
}) => {
  const [ratingName, setRatingName] = useState({
    name: '',
  });
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.ratings);
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!ratingName.name) {
      toast.error('Please Insert rating name');
      return;
    }
    let result: any = null;
    if (ratings) {
      const { payload } = await dispatch(
        updateRating({
          id: ratings.id,
          name: ratingName.name,
        }),
      );
      result = payload;
      dispatch(getAllRatings());
    } else {
      const { payload } = await dispatch(
        createRating({
          name: ratingName.name,
        }),
      );
      result = payload;
    }

    if (result) {
      setShow(false);
      setRatingName({
        name: '',
      });
      if (onClose) onClose();
    }
  };

  const handleModalClose = () => {
    if (!loading) {
      setShow(false);
      if (onClose) onClose();
    }
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRatingName(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (ratings) {
      setRatingName({ name: ratings.name });
      setShow(true);
    }
  }, [ratings]);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show, ratingName]);

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
            {ratings
              ? 'Update Rating Category'
              : 'Create Rating Category'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="rating-name"
                className="block text-gray-700 dark:text-gray-400 font-medium mb-2"
              >
                Rating Name
              </label>
              <TextInput
                id="rating-name"
                type="text"
                className="w-full z-50"
                placeholder="Enter rating name"
                name="name"
                onChange={onChangeInput}
                value={ratingName.name}
                ref={inputRef}
              />
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

export default NewRatings;
