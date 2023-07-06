import { useEffect, useState } from 'react';

import ProjectsHeader from './ProjectsHeader';
import ProjectsContainer from './ProjectsContainer';
import ProjectSkeleton from './LoadingSkeleton';

import { IProject } from '@/interfaces/project.interface';
import SomethingWrong from '@/modules/_partials/shared/SomethigWrong';

type WrapperProps = {
  projects: IProject[];
  isLoading: boolean;
  error: string | null;
};

const Wrapper = ({ projects, isLoading, error }: WrapperProps) => {
  const [selected, setSelected] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<any>([]);

  const projectsFiltering = (filter: string | undefined) => {
    setSelected('');
    const filters = ['all', 'in-progress', 'pending', 'completed'];
    if (filter && filters.includes(filter)) {
      const newProjects = projects.filter(
        (prj: any) => prj.status === filter,
      );
      return filter === 'all'
        ? setFilteredProjects(projects)
        : setFilteredProjects(newProjects);
    }
    return setFilteredProjects(
      projects.filter((proj: any) =>
        proj?.name.toLowerCase().includes(filter?.toLowerCase()),
      ),
    );
  };
  useEffect(() => {
    projectsFiltering('all');
  }, [setFilteredProjects, projects]);

  return (
    <div className="flex flex-col bg-brand-blue-light/70 dark:bg-gray-900 flex-grow relative">
      <ProjectsHeader
        selected={selected}
        setSelected={setSelected}
        filteredProjects={filteredProjects}
        setFilteredProjects={projectsFiltering}
      />
      {/* Projects cards */}
      {/* Skeletons will be shown when loading */}
      {isLoading && (
        <div className='"px-2 my-4 flex flex-col items-center justify-center sm:flex-row gap-6 flex-wrap"'>
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
        </div>
      )}
      {!isLoading && error ? (
        <SomethingWrong errorMessage={error} />
      ) : (
        ''
      )}
      {!isLoading && !error && (
        <ProjectsContainer
          filteredProjects={filteredProjects}
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </div>
  );
};

export default Wrapper;
