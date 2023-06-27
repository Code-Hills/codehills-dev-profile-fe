import { Link } from 'react-router-dom';
import {
  FiUsers,
  FiActivity,
  FiGitMerge,
  FiGitPullRequest,
  FiGitCommit,
} from 'react-icons/fi';
import { useEffect } from 'react';

import RecentProjectList from './partials/RecentProjectList';

import SmallDetailCard from '@/modules/_partials/shared/SmallDetailCard';
import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { Role } from '@/interfaces/user.interface';
import DataLayout from '@/modules/_partials/layouts/DataLayout';
import DataLoader from '@/modules/_partials/shared/DataLoader';
import { getDashboard } from '@/api/dashboard.api';

const DashboardActivity = () => {
  const dispatch = useAppDispatch();
  const { dashboard, loading } = useAppSelector(
    state => state.dashboard,
  );
  const { tokenData } = useAppSelector(state => state.profile);

  const userRole: Role = tokenData?.role;

  useEffect(() => {
    dispatch(getDashboard());
  }, []);

  return (
    <DataLayout isLoading={loading} loader={<DataLoader count={6} />}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-5">
        {userRole === 'admin' ? (
          <SmallDetailCard
            path="/users"
            title="Total Developers"
            count={dashboard.totalDevelopers}
          >
            <div className="rounded-full w-12 h-12 p-2 bg-brand-blue">
              <FiUsers className="w-full h-full text-white" />
            </div>
          </SmallDetailCard>
        ) : null}
        <SmallDetailCard
          path="/projects"
          title="Total Projects"
          count={dashboard.totalProjects}
        >
          <div className="rounded-full w-12 h-12 p-2 bg-[#9C4145] dark:bg-[#FFB3B3]">
            <FiActivity className="w-full h-full text-white dark:text-[#5F131B]" />
          </div>
        </SmallDetailCard>

        <SmallDetailCard
          path="/reviews"
          title="Total Review Cycles"
          count={dashboard.totalReviewCycle}
        >
          <div className="rounded-full w-12 h-12 p-2 bg-[#9C4145] dark:bg-[#FFB3B3]">
            <FiGitMerge className="w-full h-full text-white dark:text-[#5F131B]" />
          </div>
        </SmallDetailCard>

        {userRole !== 'admin' ? (
          <SmallDetailCard
            path="/reviews/received"
            title="Received Reviews"
            count={dashboard.totalReceivedReviews}
          >
            <div className="rounded-full w-12 h-12 p-2 bg-[#9C4145] dark:bg-[#FFB3B3]">
              <FiGitCommit className="w-full h-full text-white dark:text-[#5F131B]" />
            </div>
          </SmallDetailCard>
        ) : null}

        <SmallDetailCard
          path="/reviews"
          title="Total Request Reviews"
          count={dashboard.totalReviews}
        >
          <div className="rounded-full w-12 h-12 p-2 bg-[#9C4145] dark:bg-[#FFB3B3]">
            <FiGitPullRequest className="w-full h-full text-white dark:text-[#5F131B]" />
          </div>
        </SmallDetailCard>
      </div>

      <div className="flex flex-col mt-8">
        <div className="flex flex-wrap gap-3 justify-between items-start">
          <h2 className="text-xl md:text-2xl font-black tracking-wide mb-3">
            Recent Projects
          </h2>
          <Link
            to="/projects"
            className="text-sm font-medium bg-brand-blue hover:bg-opacity-90 text-white px-3 sm:px-6 py-1 rounded-full"
          >
            View All
          </Link>
        </div>
        <RecentProjectList projects={dashboard.recentProjects} />
      </div>
    </DataLayout>
  );
};

export default DashboardActivity;
