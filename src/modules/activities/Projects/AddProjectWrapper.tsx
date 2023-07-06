import AddProject from './partials/AddProject';

const AddProjectWrapper = () => {
  return (
    <div className="flex flex-col p-4 md:px-8 bg-brand-blue-light/70 dark:bg-transparent flex-grow">
      <AddProject />
    </div>
  );
};

export default AddProjectWrapper;
