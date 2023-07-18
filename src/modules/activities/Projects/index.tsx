import { useEffect } from 'react';

import ProjectsWrapper from './partials/Wrapper';

import {
  useAppSelector,
  useAppDispatch,
} from '@/modules/_partials/hooks/useRedux';
import { getAllProjects } from '@/redux/features/projects/projectsSlice';
import { getMyProjects } from '@/redux/features/profile/profileSlice';

const Projects = () => {
  const { tokenData, projects: userProjects } = useAppSelector(
    state => state.profile,
  );
  const isAdmin = tokenData?.role === 'admin';
  const dispatch = useAppDispatch();
  const { isLoading, error, projects } = useAppSelector(
    state => state.projects,
  );

  useEffect(() => {
    if (!isAdmin) {
      dispatch(getMyProjects(tokenData?.id as string));
    } else {
      dispatch(getAllProjects());
    }
  }, [isAdmin, tokenData?.id]);

  return (
    <ProjectsWrapper
      projects={isAdmin ? projects : userProjects}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default Projects;
