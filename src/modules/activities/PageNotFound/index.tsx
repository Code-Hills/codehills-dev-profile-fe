import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex flex-col flex-grow w-full max-w-4xl items-center justify-center p-4">
      <h1 className="text-3xl font-black tracking-wide">
        404 Page is not found
      </h1>
      <Link
        to="/"
        className="bg-brand-blue text-white font-bold mt-4 rounded px-12 py-3"
      >
        Back
      </Link>
    </div>
  );
};

export default PageNotFound;
