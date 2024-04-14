import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import NavigationBar from '../../components/NavigationBar';
import { createAxios } from '../../../createInstance';
import { BASE_API_URL } from '../../../constants/constant';
import BoxTop from '../../components/BoxTop';

import '../styles.css';

export default function UsersManger() {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
  });

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const axiosJWT = createAxios(user, dispatch);

  useEffect(() => {
    document.title = 'Users Manager';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const response = await axiosJWT.get(
        `${BASE_API_URL}/user?_page=${pageState.page}&_limit=${pageState.pageSize}`,
        {
          headers: { token: `Bearer ${accessToken}` },
        },
      );
      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: response?.data.users.docs,
        total: response?.data.users.totalDocs,
      }));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState.page, pageState.pageSize]);

  const columns = [
    {
      field: '_id',
      headerName: 'User Id',
      width: 250,
      valueGetter: (params) => {
        return user?._id === params.row._id
          ? `(You) ${params.row._id}`
          : params.row._id;
      },
    },
    { field: 'fullname', headerName: 'Full Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 230 },
    {
      field: 'isAdmin',
      headerName: 'Role',
      width: 100,
      valueGetter: (params) => {
        return params.row.isAdmin ? 'Admin' : 'User';
      },
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      valueGetter: (params) =>
        format(new Date(params.row.createdAt), 'HH:mm:ss dd/MM/yyyy'),
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 200,
      valueGetter: (params) =>
        format(new Date(params.row.updatedAt), 'HH:mm:ss dd/MM/yyyy'),
    },
  ];

  return (
    <>
      <NavigationBar />
      <BoxTop>
        <Typography variant="h6">
          Users Manager (Total: {pageState.total}{' '}
          {pageState.total > 1 ? 'users' : 'user'})
        </Typography>
        <Box marginY={2}>
          <DataGrid
            rows={pageState.data}
            rowCount={pageState.total}
            loading={pageState.isLoading}
            pagination
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            page={pageState.page - 1}
            pageSize={pageState.pageSize}
            paginationMode="server"
            onPaginationModelChange={(newPage) => {
              setPageState((old) => ({
                ...old,
                page: newPage.page + 1,
                pageSize: newPage.pageSize,
              }));
            }}
            getRowId={(row) => row._id}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </BoxTop>
    </>
  );
}
