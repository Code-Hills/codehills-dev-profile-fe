import DataLoader from '../shared/DataLoader';

interface IDataLayoutProps {
  isLoading: boolean;
  isError?: string | null;
  children: React.ReactNode;
  loader?: JSX.Element;
}

const DataLayout = ({
  isLoading = false,
  isError = null,
  loader = <DataLoader count={1} />,
  children,
}: IDataLayoutProps) => {
  const onReloadPage = () => {
    window.location.reload();
  };
  if (isLoading) {
    return (
      <div className="my-1 flex flex-col">
        <p className="sr-only">Loading...</p>
        {loader}
      </div>
    );
  }
  if (isError) {
    return (
      <div className="my-1 flex flex-col p-4 sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
        <p className="p-3 bg-red-500 dark:bg-red-600 text-white rounded-lg text-center justify-center items-center flex flex-wrap">
          {isError}
          <button
            type="button"
            onClick={onReloadPage}
            className="font-semibold p-2 hover:text-gray-200"
          >
            Reload page
          </button>
        </p>
      </div>
    );
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default DataLayout;
