/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useNavigate } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineFilter } from 'react-icons/ai';
import { Button, Dropdown, Modal, Spinner } from 'flowbite-react';
import {
  SetStateAction,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { HiCheck, HiX } from 'react-icons/hi';
import axios from 'axios';

import Secure from '@/utils/secureLs';
import { logoutFromMicrosoft } from '@/redux/features/auth/loginSlice';
import DropdownMenu from '@/modules/_partials/Dropdowns';
import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import {
  getAllProjects,
  getAllUserByProjects,
  getAllUsers,
} from '@/redux/features/users/userSlice';
import { deactivateUserAccount } from '@/redux/features/admin/deactivateUserAcountSlice';
import { activateUserAccount } from '@/redux/features/admin/activateUserAcountSlice';
import { User } from '@/interfaces/user.interface';
import Keys from '@/utils/keys';
import Pagination from '@/modules/_partials/shared/Paginations';
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';
import { removeDuplicates } from '@/helpers/removeDuplicates';

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
  const [currentRole, setCurrentRole] = useState('');
  const [currenProject, setCurrentProject] = useState('');
  const [getusersByProject, setUserByProject] = useState([]);
  const [userswithProject, setUsersWithProject] = useState(null);
  const [isThisProjectclicked, setIsThisProjectClicked] =
    useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>([
    'ID',
    'Full Name',
    'Position',
    'Email',
    'Status',
    'Action',
  ]);

  const isActivating = useAppSelector(
    state => state.activate.isLoading,
  );
  const isDeactivating = useAppSelector(
    state => state.deactivate.isLoading,
  );
  const [role, setRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
  };

  const {
    users,
    projects,
    isLoading,
    isLoadingProjects,
    usersByProject,
  } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(getAllUsers()).then(() => {
      setUserByProject(users);
    });
    dispatch(getAllProjects());
  }, [dispatch]);

  // const { projects, isGettingProjects } = useAppSelector(state => state);
  const handleUserByProject = async item => {
    setCurrentProject(item.name);
    await dispatch(getAllUserByProjects(item.id));
    if (usersByProject.users) {
      setUserByProject(usersByProject.users);
      setIsThisProjectClicked(true);
    }
  };
  const handleUserClick = (e: User) => {
    setClickedUserId(e.id);
    setIsActivated(e.isActivated);
    setHideMonuIcon(prev => !prev);
  };

  const handleCurrentUser = async (
    e: React.MouseEvent,
    item: User,
  ) => {
    e.preventDefault();
    if (!item.isActivated) {
      await dispatch(activateUserAccount(item.email));
      await dispatch(getAllUsers());
      setHideMonuIcon(prev => !prev);
    } else {
      await dispatch(deactivateUserAccount(item.email));
      await dispatch(getAllUsers());
      dispatch(getAllUsers());
      setHideMonuIcon(prev => !prev);
    }
  };

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

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const uniqueRoles = removeDuplicates(
    users?.map((user: { role: any }) => user.role),
  );

  const filteredUsers = users.filter(
    (user: { displayName: string; role: string }) =>
      user.displayName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      user.role.toLowerCase().includes(currentRole),
  );

  const fieldOptions = [
    { value: 'ID', label: 'ID' },
    { value: 'Full Name', label: 'Full Name' },
    { value: 'Position', label: 'Position' },
    { value: 'Email', label: 'Email' },
    { value: 'Status', label: 'Status' },
    { value: 'Action', label: 'Action' },
  ];

  const handleFieldSelection = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(prevFields =>
        prevFields.filter(f => f !== field),
      );
    } else {
      setSelectedFields(prevFields => [...prevFields, field]);
    }
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl flex items-center">
          <FiUsers />
          <span className="pl-2">Users</span>
        </h2>
      </div>
      <div className="flex justify-between bg-gray-100 dark:bg-gray-700 rounded-xl p-2">
        <p className="text-xl flex items-center dark:text-gray-700 flex-grow min-[150px]">
          <AiOutlineFilter className="dark:text-gray-400 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="block min-w-[200px] w-full h-full p-2 text-gray-900  rounded-lg bg-gray-100 sm:text-lg dark:bg-gray-700  dark:placeholder-gray-400 dark:text-gray-300 border-transparent focus:border-transparent focus:ring-0"
            placeholder="Filter by keyword..."
          />
        </p>

        <div className="justify-between z-10 text-rgba-22-27-44-70 font-medium rounded-lg text-sm px-2 text-center inline-flex items-center dark:bg-opacity-0 dark:focus:ring-blue-800 ml-0">
          <div className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 pt-2 pb-2 pl-5 pr-5 mr-2 rounded-full dark:text-gray-400">
            <Dropdown
              arrowIcon
              label="Fields"
              inline
              className="bg-gray-400"
            >
              <Dropdown.Item
                onClick={() =>
                  setSelectedFields([
                    'ID',
                    'Full Name',
                    'Position',
                    'Email',
                    'Status',
                    'Action',
                  ])
                }
              >
                Reset
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleFieldSelection('ID')}
              >
                ID
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleFieldSelection('Full Name')}
              >
                Full Name
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleFieldSelection('Position')}
              >
                Position
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleFieldSelection('Email')}
              >
                Email
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleFieldSelection('Status')}
              >
                Status
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleFieldSelection('Action')}
              >
                Action
              </Dropdown.Item>
            </Dropdown>
          </div>

          <div className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 pt-2 pb-2 pl-5 pr-5 mr-2 rounded-full dark:text-gray-400">
            <Dropdown
              arrowIcon
              inline
              label={
                currentRole !== ''
                  ? capitalizeFirstLetter(currentRole)
                  : 'Role'
              }
            >
              <Dropdown.Item onClick={() => setCurrentRole('')}>
                Reset
              </Dropdown.Item>
              {uniqueRoles.map(user => {
                return (
                  <Dropdown.Item
                    key={user}
                    onClick={() => setCurrentRole(user)}
                  >
                    {capitalizeFirstLetter(user)}
                  </Dropdown.Item>
                );
              })}
            </Dropdown>
          </div>
          <div className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 pt-2 pb-2 pl-5 pr-5 mr-2 rounded-full dark:text-gray-400">
            <Dropdown
              arrowIcon
              inline
              label={
                currenProject !== '' && isThisProjectclicked === true
                  ? capitalizeFirstLetter(currenProject)
                  : 'Projects'
              }
            >
              <Dropdown.Item
                onClick={() => setIsThisProjectClicked(false)}
              >
                Reset
              </Dropdown.Item>
              {projects?.map(item => {
                return (
                  <Dropdown.Item
                    key={item.id}
                    onClick={() => handleUserByProject(item)}
                  >
                    {capitalizeFirstLetter(item.name)}
                  </Dropdown.Item>
                );
              })}
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="shadow-md sm:rounded-lg mt-2 mb-8 scrollbar-thumb-blue flex items-center justify-between pb-4 bg-white dark:bg-gray-900 z-1 overflow-x-auto w-full">
        <table className="w-full text-sm min-w-max text-left text-gray-500 dark:text-gray-400 z-1">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />

                  <label
                    htmlFor="checkbox-all-search"
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </th>
              {selectedFields.includes('ID') && (
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
              )}
              {selectedFields.includes('Full Name') && (
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
              )}
              {selectedFields.includes('Position') && (
                <th scope="col" className="px-6 py-3">
                  Position
                </th>
              )}
              {selectedFields.includes('Email') && (
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
              )}

              {selectedFields.includes('Status') && (
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              )}
              {selectedFields.includes('Action') && (
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {!isThisProjectclicked &&
              filteredUsers.length !== 0 &&
              filteredUsers?.map((item: User, index: number) => {
                return (
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
                    {selectedFields.includes('ID') && (
                      <td className="px-6 py-4">{index + 1}</td>
                    )}

                    {selectedFields.includes('Full Name') && (
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
                          <div className="text-base font-semibold dark:text-gray-400">
                            {String(item.displayName)}
                          </div>
                        </div>
                      </th>
                    )}
                    {selectedFields.includes('Position') && (
                      <td className="px-6 py-4">{item.role}</td>
                    )}
                    {selectedFields.includes('Email') && (
                      <td className="px-6 py-4">{item.email}</td>
                    )}
                    {selectedFields.includes('Status') && (
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {item.isActivated ? (
                            <span className="bg-blue-100 hover:bg-blue-300 py-1 px-2 rounded-full dark:bg-gray-600">
                              Activated
                            </span>
                          ) : (
                            <span className="bg-red-700 hover:bg-red-700 text-white text-sm py-1 px-2 rounded-full">
                              Deactivated
                            </span>
                          )}
                        </div>
                      </td>
                    )}

                    {selectedFields.includes('Action') && (
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleUserClick(item)}
                          className="inline-flex items-center p-2 font-medium text-center text- gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                          type="button"
                        >
                          <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>

                        {clickedUserId === item.id && (
                          <div
                            className={`z-10 ${
                              showMenuIcon ? '' : 'hidden'
                            } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 right-0`}
                          >
                            <ul
                              className="py-2 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownMenuIconHorizontalButton"
                            >
                              <li>
                                <Link
                                  to="/activate"
                                  onClick={e =>
                                    handleCurrentUser(e, item)
                                  }
                                  className=" text-blue-600 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  {isActivated ? (
                                    <span className="text-red-500">
                                      {isDeactivating
                                        ? 'Deactivating ...'
                                        : 'Deactivate'}
                                    </span>
                                  ) : (
                                    <span>
                                      {' '}
                                      {isActivating
                                        ? 'Activating ...'
                                        : 'Activate'}
                                    </span>
                                  )}
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/role"
                                  onClick={e => {
                                    e.preventDefault();
                                    setSelectedUser(item);
                                    setRole(item.role);
                                    setIsOpen(true);
                                  }}
                                  className=" text-blue-600 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Change Role
                                </Link>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            {!isThisProjectclicked &&
              !isLoading &&
              filteredUsers.length === 0 && (
                <tr>
                  <p className="text-blue-600 bold text-lg p-2">
                    User not found!
                  </p>
                </tr>
              )}
            {isThisProjectclicked &&
              !isLoading &&
              getusersByProject.length === 0 && (
                <tr>
                  <p className="text-blue-600 bold text-lg p-2">
                    Users by this project are not found!
                  </p>
                </tr>
              )}

            {isThisProjectclicked &&
              getusersByProject.length > 0 &&
              getusersByProject?.map((item: User, index: number) => {
                return (
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
                    {selectedFields.includes('ID') && (
                      <td className="px-6 py-4">{index + 1}</td>
                    )}

                    {selectedFields.includes('Full Name') && (
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
                          <div className="text-base font-semibold dark:text-gray-400">
                            {String(item.displayName)}
                          </div>
                        </div>
                      </th>
                    )}
                    {selectedFields.includes('Position') && (
                      <td className="px-6 py-4">{item.role}</td>
                    )}
                    {selectedFields.includes('Email') && (
                      <td className="px-6 py-4">{item.email}</td>
                    )}
                    {selectedFields.includes('Status') && (
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {item.isActivated ? (
                            <span className="bg-blue-100 hover:bg-blue-300 py-1 px-2 rounded-full dark:bg-gray-600">
                              Activated
                            </span>
                          ) : (
                            <span className="bg-red-700 hover:bg-red-700 text-white text-sm py-1 px-2 rounded-full">
                              Deactivated
                            </span>
                          )}
                        </div>
                      </td>
                    )}

                    {selectedFields.includes('Action') && (
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleUserClick(item)}
                          className="inline-flex items-center p-2 font-medium text-center text- gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                          type="button"
                        >
                          <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>

                        {clickedUserId === item.id && (
                          <div
                            className={`z-10 ${
                              showMenuIcon ? '' : 'hidden'
                            } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 right-0`}
                          >
                            <ul
                              className="py-2 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownMenuIconHorizontalButton"
                            >
                              <li>
                                <Link
                                  to="/activate"
                                  onClick={e =>
                                    handleCurrentUser(e, item)
                                  }
                                  className=" text-blue-600 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  {isActivated ? (
                                    <span className="text-red-500">
                                      {isDeactivating
                                        ? 'Deactivating ...'
                                        : 'Deactivate'}
                                    </span>
                                  ) : (
                                    <span>
                                      {' '}
                                      {isActivating
                                        ? 'Activating ...'
                                        : 'Activate'}
                                    </span>
                                  )}
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/role"
                                  onClick={e => {
                                    e.preventDefault();
                                    setSelectedUser(item);
                                    setRole(item.role);
                                    setIsOpen(true);
                                  }}
                                  className=" text-blue-600 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Change Role
                                </Link>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
          {isLoading && (
            <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
              <tr className="animate-pulse bg-gray-200 border-t border-white border-4 transition-all duration-300 dark:bg-gray-700">
                <th scope="col" className="p-4 mt-2 mb-2" />
                <th scope="col" className="px-6 py-3 " />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
              </tr>
              <tr className="border-t border-white animate-pulse border-4 bg-gray-200 mt-5  transition-all duration-300 dark:bg-gray-700">
                <th scope="col" className="p-4 mt-2 mb-2" />
                <th scope="col" className="px-6 py-3 " />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
              </tr>
              <tr className="border-t border-white animate-pulse border-4 bg-gray-200 mt-5  transition-all duration-300 dark:bg-gray-700">
                <th scope="col" className="p-4 mt-2 mb-2" />
                <th scope="col" className="px-6 py-3 " />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
              </tr>
              <tr className="border-t border-white animate-pulse border-4 bg-gray-200 mt-5  transition-all duration-300 dark:bg-gray-700">
                <th scope="col" className="p-4 mt-2 mb-2" />
                <th scope="col" className="px-6 py-3 " />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
              </tr>
              <tr className="border-t border-white border-4 animate-pulse bg-gray-200 mt-5  transition-all duration-300 dark:bg-gray-700">
                <th scope="col" className="p-4 mt-2 mb-2" />
                <th scope="col" className="px-6 py-3 " />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3" />
              </tr>
            </thead>
          )}
        </table>
      </div>
      <Pagination />

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
    </>
  );
};

export default UsersActivity;
