/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { Link, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { FiUsers } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { AiOutlineFilter } from 'react-icons/ai';

import Secure from '@/utils/secureLs';
import { logoutFromMicrosoft } from '@/redux/features/auth/loginSlice';
import DashboardLayout from '@/modules/_partials/layouts/DashboardLayout';
import DropdownMenu from '@/modules/_partials/Dropdowns';
import { useAppSelector } from '@/modules/_partials/hooks/useRedux';
import { SetStateAction, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { getAllUsers } from '@/redux/features/users/userSlice';
import isAuth from '@/helpers/isAuth';
import { deactivateUserAcount } from '@/redux/features/admin/activateUserAcountSlice';


const UsersActivity = () => {
  const [showMenuIcon, setHideMonuIcon] = useState(false);
  const [clickedUserId, setClickedUserId] = useState(null);
  const [isActivated, setIsActivated] = useState(false);

  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const handleLogout = (e: any) => {
    e.preventDefault();
    Secure.removeToken();
    dispatch(logoutFromMicrosoft);
    navigate('/');
  };

  const handleclickedUserId = (e: SetStateAction<null>) => {
    setClickedUserId(e);
  }

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const data = useAppSelector(
    state => state.users,
  );
  const handleUserClick = (e) => {
    setClickedUserId(e.id);
    setIsActivated(e.isActivated);
    setHideMonuIcon(prev => !prev);
  }

  const handleCurrentUser=(e,email)=>{
    e.preventDefault();
    console.log(clickedUserId,"you are going to dis able me");
    console.log(isAuth().role);
   console.log(email)
    dispatch(deactivateUserAcount(email))
    .then(res=>{
      console.log(res,"___________+JHHJJHHHHHHHHHHHHHH");
    }).catch(error=>{
      console.log(error,"error___________+JHHJJHHHHHHHHHHHHHH");

    });
  }
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
                  {data.isLoading === false && data.user !== null && data.user.map((item: { displayName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; role: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; isActivated: any; }, index: number) => {
                    return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                      <td className="px-6 py-4">{index + 1}</td>
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                          // src={item.avatar===null? item.avatar :"https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"}
                          alt="Jese"
                        />
                        <div className="pl-3">
                          <div className="text-base font-semibold">
                            {item.displayName}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{item.role}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">{item.isActivated ? "Activated" : "Disabled"}</div>
                      </td>
                      <td className="px-6 py-4">

                        <button onClick={() => handleUserClick(item)} className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                        </button>

                        {
                          clickedUserId === item.id && (
                            <div className={`z-10 ${showMenuIcon ? "" : "hidden"} absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 right-0`}>
                              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
          
                                <li>
                                <Link  to="/activate" onClick={(e)=>handleCurrentUser(e,item.email)} className=" text-blue-600 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{isActivated? <span className='text-red-500'>Disable</span>:"Activate"}</Link>
                                </li>
                              </ul>
                              <div className="py-2" />
                            </div>
                          )
                        }
                      </td>
                    </tr>
                  })}

                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example ">
              <ul className="flex items-center justify-center -space-x-px w-full mb-10 mt-8">
                <li>
                  <Link to="dashboard/users" className="block flex px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Previous</span>
                  </Link>

                </li>
                <li>
                  <Link to="1" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    1
                  </Link>
                </li>
                <li>
                  <Link to="2" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</Link>
                </li>
                <li>
                  <Link to="2" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</Link>
                </li>
                <li>
                  <Link to="3" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</Link>
                </li>
                <li>
                  <Link to="4" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</Link>
                </li>
                <li>
                  <Link to="5" className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white flex">
                    <span>Next</span>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  </Link>
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
