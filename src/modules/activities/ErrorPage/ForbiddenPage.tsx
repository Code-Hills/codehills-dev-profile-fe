import { Link } from 'react-router-dom';

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col flex-grow w-full max-w-4xl mx-auto items-center justify-center p-4">
      <h1 className="text-3xl font-black tracking-wide">Forbidden</h1>
      <p className="text-center mt-2">
        Sorry, you do not have permission to access this page.
      </p>
      <Link
        to="/"
        className="bg-brand-blue text-white font-bold mt-4 rounded px-12 py-3"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ForbiddenPage;
