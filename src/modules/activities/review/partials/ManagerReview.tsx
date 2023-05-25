/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

const ManagerReview = () => {
  const [writtenReview, setWrittenReview] = useState('');
  const [performanceRating, setPerformanceRating] = useState(3);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // submit form data to backend
  };

  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-lg font-medium mb-2">Manager Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Written review
          </label>
          <textarea
            className="form-textarea w-full h-24 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
            value={writtenReview}
            onChange={e => setWrittenReview(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Performance rating
          </label>
          <div className="flex items-center">
            <select
              className="form-select w-1/2 mr-4"
              value={performanceRating}
              onChange={e =>
                setPerformanceRating(parseInt(e.target.value, 10))
              }
              required
            >
              <option value="1">Delivered too poorly</option>
              <option value="2">
                Delivered below expectation but could intermittently
                deliver good work
              </option>
              <option value="3">Met expectations</option>
              <option value="4">Delivered excellently</option>
              <option value="5">Went beyond expectations</option>
            </select>
            <span className="text-gray-700">
              ({performanceRating} out of 5)
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManagerReview;
