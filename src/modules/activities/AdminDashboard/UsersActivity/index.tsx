/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { Link, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { FiUsers } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { AiOutlineFilter } from 'react-icons/ai';
import { Button, Dropdown, Modal, Spinner } from 'flowbite-react';
import Secure from '@/utils/secureLs';
import { logoutFromMicrosoft } from '@/redux/features/auth/loginSlice';
import DashboardLayout from '@/modules/_partials/layouts/DashboardLayout';
import DropdownMenu from '@/modules/_partials/Dropdowns';
import { useAppSelector } from '@/modules/_partials/hooks/useRedux';
import { SetStateAction, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { getAllUsers } from '@/redux/features/users/userSlice';
import isAuth from '@/helpers/isAuth';
import { deactivateUserAcount } from '@/redux/features/admin/deactivateUserAcountSlice';
import { activateUserAcount } from '@/redux/features/admin/activateUserAcountSlice';
import { toast } from 'react-toastify';
import UsersSkeleton from './UsersSkeleton';
import { User } from '@/interfaces/user.interface';
import { HiCheck, HiX } from 'react-icons/hi';
import axios from 'axios';
import Keys from '@/utils/keys';


const UsersActivity = () => {

  interface RootState {
    activate: {
      isLoading: boolean;
    };
    deactivate: {
      isLoading: boolean;
    };
  }


  const [showMenuIcon, setHideMonuIcon] = useState(false);
  const [clickedUserId, setClickedUserId] = useState(null);
  const [isActivated, setIsActivated] = useState(false);
  const isActivating = useSelector((state: RootState) => state.activate.isLoading);
  const isDeactivating = useSelector((state: RootState) => state.deactivate.isLoading);
  const [role, setRole] = useState('');

  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    // if (isUpdating) return;
    setIsOpen(false);
  };
  const [isSaving, setIsSaving] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const [selectedUser, setSelectedUser] = useState<any>({});

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

  const { users, isLoading } = useAppSelector(
    state => state.users,
  );


  const handleUserClick = (e: User) => {
    setClickedUserId(e.id);
    setIsActivated(e.isActivated);
    setHideMonuIcon(prev => !prev);
  }

  const handleCurrentUser = async (e: React.MouseEvent, item: User) => {
    e.preventDefault();
    if (!item.isActivated) {
      await dispatch(activateUserAcount(item.email))
      await dispatch(getAllUsers());
      setHideMonuIcon(prev => !prev);
    } else {
      await dispatch(deactivateUserAcount(item.email))
      await dispatch(getAllUsers());
      dispatch(getAllUsers());
      setHideMonuIcon(prev => !prev);
    }

  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data } = await axios.patch(
        `${Keys.DEFAULT_API}/api/v1/users/roles`,
        {
          role,
          email: selectedUser.email,
        },
        {
          headers: {
            Authorization: `Bearer ${Secure.getToken()}`,
          },
        },
      );
      setIsSaving(false);
      dispatch(getAllUsers());
      onClose();
      setHideMonuIcon(prev => !prev);
    } catch (error) {
      setIsSaving(false);
    }
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
        <div className="relative bg-white bg-gray-900 dark:bg-gray-900 m-4 p-2 rounded-xl flex justfy-center flex-col">
          <div className="flex justify-between bg-gray-100 dark:bg-gray-700 rounded-xl p-2">
            <p className="text-xl flex items-center dark:text-gray-700">
              <AiOutlineFilter className='dark:text-gray-400 text-gray-400' />
              <input type="text" className="block w-full h-full p-2 text-gray-900  rounded-lg bg-gray-100 border-none sm:text-lg dark:bg-gray-700 dark:border-none dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500" placeholder='Filter by keyword...' />
            </p>

            <div className="flex justify-between">
              <DropdownMenu />
              <DropdownMenu />
              <DropdownMenu />
            </div>
          </div>



          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2 z-10">
            <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 z-10 overflow-x-auto">
              <table className="w-full text-sm min-w-max text-left text-gray-500 dark:text-gray-400 z-10">
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
                  {users?.map((item, index: number) => {
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
                          alt="Jese"
                        />
                        <div className="pl-3">
                          <div className="text-base font-semibold">
                            {String(item.displayName)}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{item.role}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">{item.isActivated ? <span className="bg-blue-100 hover:bg-blue-300 py-1 px-2 rounded-full">Activated</span> : <span className="bg-red-700 hover:bg-red-700 text-white text-sm py-1 px-2 rounded-full">Deactivated</span>}</div>
                      </td>
                      <td className="px-6 py-4">

                        <button onClick={() => handleUserClick(item)} className="inline-flex items-center p-2 font-medium text-center text- gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                        </button>

                        {
                          clickedUserId === item.id && (
                            <div className={`z-10 ${showMenuIcon ? "" : "hidden"} absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 right-0`}>
                              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">

                                <li>
                                  <Link to="/activate" onClick={(e) => handleCurrentUser(e, item)} className=" text-blue-600 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{isActivated ? <span className='text-red-500'>{isDeactivating ? "Deactivating ..." : "Deactivate"}</span> : <span> {isActivating ? "Activating ..." : "Activate"}</span>}</Link>
                                </li>
                                <li>
                                  <Link to="/role"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setSelectedUser(item);
                                      setRole(item.role);
                                      setIsOpen(true);
                                    }}

                                    className=" text-blue-600 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Change Role</Link>
                                </li>
                              </ul>
                            </div>
                          )
                        }
                      </td>
                    </tr>
                  })}


                </tbody>
                {isLoading && <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                  <tr className='animate-pulse bg-gray-200 border-t border-white border-4 transition-all duration-300 dark:bg-gray-700'>
                    <th scope="col" className="p-4 mt-2 mb-2" />
                    <th scope="col" className="px-6 py-3 " />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                  </tr>

                  <tr className='border-t border-white animate-pulse border-4 bg-gray-200 mt-5  transition-all duration-300 dark:bg-gray-700'>
                    <th scope="col" className="p-4 mt-2 mb-2" />
                    <th scope="col" className="px-6 py-3 " />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                  </tr>
                  <tr className='border-t border-white animate-pulse border-4 bg-gray-200 mt-5  transition-all duration-300 dark:bg-gray-700'>
                    <th scope="col" className="p-4 mt-2 mb-2" />
                    <th scope="col" className="px-6 py-3 " />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                  </tr>
                  <tr className='border-t border-white animate-pulse border-4 bg-gray-200 mt-5  transition-all duration-300 dark:bg-gray-700'>
                    <th scope="col" className="p-4 mt-2 mb-2" />
                    <th scope="col" className="px-6 py-3 " />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                  </tr> <tr className='border-t border-white border-4 animate-pulse bg-gray-200 mt-5  transition-all duration-300 dark:bg-gray-700'>
                    <th scope="col" className="p-4 mt-2 mb-2" />
                    <th scope="col" className="px-6 py-3 " />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                    <th scope="col" className="px-6 py-3" />
                  </tr>
                </thead>
                }
              </table>
            </div>
            <nav aria-label="Page navigation example ">
              <ul className="flex items-center justify-center -space-x-px w-full mb-10 mt-8">
                <li>
                  <Link to="/users" className="block flex px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
      <Modal
        size="2xl"
        show={isOpen}
        position="top-center"
        onClose={onClose}
      >
        <Modal.Header>Change User Role</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col space-y-6 items-center">
            <div className="mt-8 flex items-center space-x-8 md:space-x-10">
              {/* change user role  */}
              <div className="flex flex-row items-center">
                <p className="text-gray-600 mr-4 dark:text-white">
                  Select User Role
                </p>
                <select
                  className="w-64 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  name="role"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="developer">Developer</option>
                  <option value="manager">Manager</option>
                  <option value="architect">Architect</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button color="gray" type="button" onClick={onClose}>
            <HiX className="mr-2 h-5 w-5" />
            Cancel
          </Button>
          <Button
            gradientDuoTone="cyanToBlue"
            type="submit"
            disabled={isSaving}
            onClick={handleSave}
          >
            Save
            {isSaving ? (
              <Spinner color="success" size="sm" className="ml-2" />
            ) : (
              <HiCheck className="ml-2 h-5 w-5" />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  );
};

export default UsersActivity;