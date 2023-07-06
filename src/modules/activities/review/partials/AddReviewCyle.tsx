/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Modal, TextInput } from 'flowbite-react';
import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { createCycle, updateCycle } from '@/api/cyle.api';
import { Cycle } from '@/interfaces/cycle.interface';
import { formatDateLocale } from '@/helpers/format';
import { calculateActiveCycle } from '@/redux/slices/cycleSlice';

const AddReviewCycle = ({
  title = 'Add Review Cycle',
  children,
  cycle,
}: {
  title?: string;
  children?: React.ReactNode;
  cycle?: Cycle;
}) => {
  const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
  });
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.cycle);
  const [show, setShow] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!dates.startDate || !dates.endDate) {
      toast.error('Please fill all fields');
      return;
    }
    let result: any = null;
    if (cycle) {
      const { payload } = await dispatch(
        updateCycle({
          id: cycle.id,
          startDate: dates.startDate,
          endDate: dates.endDate,
        }),
      );
      result = payload;
    } else {
      const { payload } = await dispatch(
        createCycle({
          endDate: dates.endDate,
          startDate: dates.startDate,
        }),
      );
      result = payload;
    }

    if (result) {
      setShow(false);
      setDates({
        startDate: '',
        endDate: '',
      });
      dispatch(calculateActiveCycle());
    }
  };

  const onClose = () => {
    if (!loading) {
      setShow(false);
    }
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDates(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    if (cycle) {
      setDates(prevState => ({
        ...prevState,
        startDate: formatDateLocale(cycle.startDate),
        endDate: formatDateLocale(cycle.endDate),
      }));
    }
  }, [cycle]);

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
      <Modal show={show} size="xl" popup onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <h2 className="text-lg font-medium mb-6">{title}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="start-date"
                className="block text-gray-700 dark:text-gray-400 font-medium mb-2"
              >
                Start Date
              </label>
              <TextInput
                id="start-date"
                type="date"
                className="w-full"
                placeholder="Start date..."
                name="startDate"
                onChange={onChangeInput}
                value={dates.startDate}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="end-date"
                className="block text-gray-700 dark:text-gray-400 font-medium mb-2"
              >
                Start Date
              </label>
              <TextInput
                id="end-date"
                type="date"
                className="w-full"
                placeholder="End date..."
                name="endDate"
                onChange={onChangeInput}
                value={dates.endDate}
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

export default AddReviewCycle;
