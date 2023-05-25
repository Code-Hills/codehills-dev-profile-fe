/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Modal, Select, Textarea } from 'flowbite-react';
import React, { useState } from 'react';

const SelfReview = ({
  title = 'Self Review',
  className = 'px-3 py-1.5 text-xs font-medium',
}) => {
  const [show, setShow] = useState(false);
  const [writtenReview, setWrittenReview] = useState('');
  const [performanceRating, setPerformanceRating] = useState(3);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // submit form data to backend
  };

  const onClose = () => {
    setShow(false);
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
              <label className="block text-gray-700 dark:text-gray-400 font-medium mb-2">
                Written review
              </label>
              <Textarea
                className="w-full h-24 px-3 py-2"
                // value={writtenReview}
                // onChange={e => setWrittenReview(e.target.value)}
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
                  value={performanceRating}
                  onChange={e =>
                    setPerformanceRating(parseInt(e.target.value, 10))
                  }
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
                  ({performanceRating} out of 5)
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <Button gradientMonochrome="info" type="submit">
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
