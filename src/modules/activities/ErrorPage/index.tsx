import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ errorCode = 404 }: { errorCode?: number }) => {
  let errorMessage = '';

  switch (errorCode) {
    case 404:
      errorMessage =
        "Oops! The page you're looking for is not found.";
      break;
    case 500:
      errorMessage = 'Oops! Something went wrong on the server.';
      break;
    default:
      errorMessage = 'Oops! An error has occurred.';
      break;
  }

  return (
    <div className="flex flex-col flex-grow w-full max-w-4xl mx-auto text-center items-center justify-center p-4">
      <h1 className="text-3xl font-black tracking-wide mb-6">
        {errorMessage}
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        We apologize for the inconvenience. Please try again later.
      </p>
      <Link
        to="/"
        className="bg-brand-blue text-white font-bold rounded px-6 py-3 hover:bg-blue-700 transition-colors duration-200"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
