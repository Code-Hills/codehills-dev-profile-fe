import { useEffect } from 'react';
import Helmet from 'react-helmet';

import ProjectsWrapper from './partials/Wrapper';

import {
  useAppSelector,
  useAppDispatch,
} from '@/modules/_partials/hooks/useRedux';
import { getDashboard } from '@/api/dashboard.api';

const Projects = () => {
  const {
    dashboard: { recentProjects },
    loading: isLoading,
    error,
  } = useAppSelector(state => state.dashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!recentProjects.length) {
      dispatch(getDashboard());
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Projects - Codehills</title>
      </Helmet>
      <ProjectsWrapper
        projects={recentProjects}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};

export default Projects;
