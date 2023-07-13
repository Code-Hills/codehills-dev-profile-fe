import Project from './Project';

export type ContainerProps = {
  filteredProjects: any[];
  selected: string;
  setSelected: (arg: string) => void;
};

const ProjectsContainer = ({
  filteredProjects,
  selected,
  setSelected,
}: ContainerProps) => {
  return (
    <div className="px-2 my-4 flex flex-col items-center justify-center sm:flex-row gap-6 flex-wrap">
      {filteredProjects.length > 0 ? (
        filteredProjects.map((proj: any) => {
          return (
            <Project
              key={proj.id}
              proj={proj}
              selected={selected}
              setSelected={setSelected}
            />
          );
        })
      ) : (
        <div className="text-gray-500 flex flex-col items-center justify-center">
          <h1 className="text-2xl text-center mt-8 mb-4">
            No projects
          </h1>
          <p className="text">
            There are currently, no projects found here
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectsContainer;
