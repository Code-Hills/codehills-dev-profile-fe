import { Link, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
  FiUsers,
  FiActivity,
  FiGitMerge,
  FiGitPullRequest,
  FiGitCommit,
} from 'react-icons/fi';

import RecentProjectList from './partials/RecentProjectList';

import SmallDetailCard from '@/modules/_partials/shared/SmallDetailCard';

const DashboardActivity = () => {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-5">
        <SmallDetailCard
          path="/users"
          title="Total Developers"
          count={400}
        >
          <div className="rounded-full w-12 h-12 p-2 bg-brand-blue">
            <FiUsers className="w-full h-full text-white" />
          </div>
        </SmallDetailCard>
        <SmallDetailCard
          path="/projects"
          title="Total Projects"
          count={10}
        >
          <div className="rounded-full w-12 h-12 p-2 bg-[#9C4145] dark:bg-[#FFB3B3]">
            <FiActivity className="w-full h-full text-white dark:text-[#5F131B]" />
          </div>
        </SmallDetailCard>

        <SmallDetailCard
          path="/reviews"
          title="Total Review Cycles"
          count={200}
        >
          <div className="rounded-full w-12 h-12 p-2 bg-[#9C4145] dark:bg-[#FFB3B3]">
            <FiGitMerge className="w-full h-full text-white dark:text-[#5F131B]" />
          </div>
        </SmallDetailCard>

        <SmallDetailCard
          path="/reviews/received"
          title="Received Reviews"
          count={50000}
        >
          <div className="rounded-full w-12 h-12 p-2 bg-[#9C4145] dark:bg-[#FFB3B3]">
            <FiGitCommit className="w-full h-full text-white dark:text-[#5F131B]" />
          </div>
        </SmallDetailCard>

        <SmallDetailCard
          path="/reviews"
          title="Total Request Reviews"
          count={10}
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
        <RecentProjectList />
      </div>
    </>
  );
};

export default DashboardActivity;
