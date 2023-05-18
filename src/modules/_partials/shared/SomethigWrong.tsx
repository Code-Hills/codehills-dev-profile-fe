const SomethigWrong = ({ errorMessage = '' }) => {
  const onReloadPage = () => {
    window.location.reload();
  };
  return (
    <div className="flex flex-col p-4 w-2/3 md:1/2 lg:w-1/3 mx-auto">
      <p className="p-3 bg-red-500 text-white rounded-lg text-center justify-center items-center flex flex-wrap">
        {errorMessage || 'Something went wrong'}{' '}
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
};

export default SomethigWrong;
