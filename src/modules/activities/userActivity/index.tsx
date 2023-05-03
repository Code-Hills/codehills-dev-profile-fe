import { profile } from 'console';

import { Link, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import {
  Avatar,
  Button,
  Modal,
  Spinner,
  Dropdown,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { avatar } from '@material-tailwind/react';
import { HiRefresh, HiUpload, HiX, HiCheck } from 'react-icons/hi';
import axios from 'axios';

import Secure from '@/utils/secureLs';
import { logoutFromMicrosoft } from '@/redux/features/auth/loginSlice';
import DashboardLayout from '@/modules/_partials/layouts/DashboardLayout';
import { fetchUsers } from '@/redux/features/users/userSlice';
import Keys from '@/utils/keys';

const UserActivity = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const handleLogout = (e: any) => {
    e.preventDefault();
    Secure.removeToken();
    dispatch(logoutFromMicrosoft);
    navigate('/');
  };

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    // if (isUpdating) return;
    setIsOpen(false);
  };

  const [role, setRole] = useState('');

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    try {
      axios
        .get(`${Keys.DEFAULT_API}/api/v1/users`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: Secure.getToken(),
          },
        })
        .then(response => console.log(response.data));
    } catch (error: any) {
      throw error.response.data;
    }
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'fullname', headerName: 'Fullname', width: 250 },
    { field: 'position', headerName: 'Position', width: 250 },
    { field: 'status', headerName: 'Status', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (_params: any) => (
        <Dropdown arrowIcon={false} inline label="...">
          <Dropdown.Item onClick={() => setIsOpen(true)}>
            Change Role
          </Dropdown.Item>
          <Dropdown.Item>Block</Dropdown.Item>
          <Dropdown.Item>Update</Dropdown.Item>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      fullname: 'Alice Smith',
      position: 'Marketing Manager',
      status: 'Active',
      email: 'alice.smith@example.com',
    },
    {
      id: 2,
      fullname: 'Bob Brown',
      position: 'Sales Representative',
      status: 'Active',
      email: 'bob.brown@example.com',
    },
    {
      id: 3,
      fullname: 'Charlie Davis',
      position: 'IT Manager',
      status: 'Inactive',
      email: 'charlie.davis@example.com',
    },
    {
      id: 4,
      fullname: 'David Taylor',
      position: 'Customer Support Specialist',
      status: 'Active',
      email: 'david.taylor@example.com',
    },
    {
      id: 5,
      fullname: 'Emily Anderson',
      position: 'HR Generalist',
      status: 'Active',
      email: 'emily.anderson@example.com',
    },
    {
      id: 6,
      fullname: 'Frank Martinez',
      position: 'Software Developer',
      status: 'Active',
      email: 'frank.martinez@example.com',
    },
    {
      id: 7,
      fullname: 'Grace Lee',
      position: 'Product Designer',
      status: 'Inactive',
      email: 'grace.lee@example.com',
    },
    {
      id: 8,
      fullname: 'Henry Baker',
      position: 'Business Analyst',
      status: 'Active',
      email: 'henry.baker@example.com',
    },
    {
      id: 9,
      fullname: 'Isabella Hernandez',
      position: 'Financial Analyst',
      status: 'Inactive',
      email: 'isabella.hernandez@example.com',
    },
    {
      id: 10,
      fullname: 'Jacob Wilson',
      position: 'Operations Manager',
      status: 'Active',
      email: 'jacob.wilson@example.com',
    },
    {
      id: 11,
      fullname: 'Katherine Kim',
      position: 'Marketing Coordinator',
      status: 'Active',
      email: 'katherine.kim@example.com',
    },
    {
      id: 12,
      fullname: 'Liam Davis',
      position: 'Software Engineer',
      status: 'Inactive',
      email: 'liam.davis@example.com',
    },
    {
      id: 13,
      fullname: 'Mia Johnson',
      position: 'Sales Manager',
      status: 'Active',
      email: 'mia.johnson@example.com',
    },
    {
      id: 14,
      fullname: 'Nathan Perez',
      position: 'Customer Success Manager',
      status: 'Active',
      email: 'nathan.perez@example.com',
    },
    {
      id: 15,
      fullname: 'Olivia Garcia',
      position: 'Product Manager',
      status: 'Inactive',
      email: 'olivia.garcia@example.com',
    },
  ];

  return (
    <DashboardLayout>
      <div className="container p-6 mx-auto grid">
        <div style={{ height: 1300, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            checkboxSelection
            sx={{
              height: '50%',
              width: '100%',
              '& .MuiDataGrid-columnHeaderTitle': {
                color: 'black',
              },
              '& .MuiDataGrid-columnHeadersInner': {
                // backgroundColor: "#046CC6",
                fontWeight: 'bold',
                textAlign: 'center',
              },
              '& .MuiDataGrid-columnHeaderTitleContainerContent': {
                paddingLeft: '10px',
              },
              '& .MuiToolbar-root': {
                color: '#1565c0',
              },
              '& .MuiDataGrid-selectedRowCount': {
                color: '#1565c0',
              },
              '& .css-d3ri6l-MuiStack-root': {
                display: 'grid',
                flexDirection: 'column !important',
                alignItems: 'start',
              },
            }}
            className="text-gray-500 bg-white border border-gray-300 rounded-r-lg  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
          />
        </div>
      </div>
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
                  Change User Role
                </p>
                <select
                  className="w-64 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  name="role"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
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
            // disabled={isUpdating}
            // onClick={updateUserProfile}
          >
            Save
            {/* {isUpdating ? (
              <Spinner color="success" size="sm" className="ml-2" />
            ) : ( */}
            <HiCheck className="ml-2 h-5 w-5" />
            {/* )} */}
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  );
};

export default UserActivity;
