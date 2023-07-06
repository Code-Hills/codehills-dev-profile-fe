import { useEffect } from 'react';

import ProjectsWrapper from './partials/Wrapper';

import {
  useAppSelector,
  useAppDispatch,
} from '@/modules/_partials/hooks/useRedux';
import { getAllProjects } from '@/redux/features/projects/projectsSlice';

const Projects = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, projects } = useAppSelector(
    state => state.projects,
  );

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  return (
    <ProjectsWrapper
      projects={projects}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default Projects;
