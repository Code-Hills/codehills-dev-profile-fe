import { Link, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { FiUsers } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineFilter } from 'react-icons/ai';

import Secure from '@/utils/secureLs';
import { logoutFromMicrosoft } from '@/redux/features/auth/loginSlice';
import DashboardLayout from '@/modules/_partials/layouts/DashboardLayout';
import DropdownMenu from '@/modules/_partials/Dropdowns';

const UsersActivity = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const handleLogout = (e: any) => {
    e.preventDefault();
    Secure.removeToken();
    dispatch(logoutFromMicrosoft);
    navigate('/');
  };

  return (
    <DashboardLayout>
      <section className="bg-gray-100 dark:bg-gray-900 dark:text-white">
        <div className="flex justify-between p-4 ">
          <h2 className="text-2xl flex items-center">
            <FiUsers />
            <span className="pl-2">users</span>
          </h2>
          <button
            type="button"
            className="bg-blue-500 flex hover:bg-blue-700 items-center text-white font-bold py-2 px-4 rounded-full"
          >
            <GoPlus />
            <span className="pl-1">Add</span>
          </button>
        </div>
        <div className="relative bg-white dark:bg-gray-900 m-4 p-2 rounded-xl flex justfy-center flex-col">
          <div className="flex justify-between bg-gray-100 rounded-xl p-2">
            <p className="text-xl flex items-center dark:text-gray-700">
              <AiOutlineFilter />
              <span className="pl-2">Filter by keyword...</span>
            </p>

            <div className="flex justify-between">
              <DropdownMenu />
              <DropdownMenu />
              <DropdownMenu />
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2 z-10">
            <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 z-10">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 z-10">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-all-search"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Full Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4">01</td>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                        alt="Jese"
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          Neil Sims
                        </div>
                        <div className="font-normal text-gray-500">
                          neil.sims@flowbite.com
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">React Developer</td>
                    <td className="px-6 py-4">bizip04@gmail.com</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">Online</div>
                    </td>
                    <td className="px-6 py-4">
                      <button type="button">
                        <BsThreeDots className="text-xl" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          <nav aria-label="Page navigation example ">
            <ul class="flex items-center justify-center -space-x-px w-full mb-10 mt-8">
              <li>
                <a href="#" class="block flex px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span>Previous</span>
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                </a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
              </li>
              <li>
                <a href="#" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
              </li>
              <li>
                <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
              </li>
              <li>
                <a href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white flex">
                  <span>Next</span>
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </a>
              </li>
            </ul>
          </nav>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default UsersActivity;
