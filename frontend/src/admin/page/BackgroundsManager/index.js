import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

import NavigationBar from '../../components/NavigationBar';
import BoxTop from '../../components/BoxTop';
import ModalAddBackground from '../../components/ModalAddBackground';
import { createAxios } from '../../../createInstance';
import { BASE_API_URL, toastTheme } from '../../../constants/constant';

export default function BackgroundsManager() {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5,
  });
  const [openModal, setOpenModal] = useState(false);
  const [loadingRows, setLoadingRows] = useState({});

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const axiosJWT = createAxios(user, dispatch);

  const fetchData = async () => {
    setPageState((old) => ({ ...old, isLoading: true }));
    const response = await axiosJWT.get(
      `${BASE_API_URL}/background/?_page=${pageState.page}&_limit=${pageState.pageSize}`,
      {
        headers: { token: `Bearer ${accessToken}` },
      },
    );
    setPageState((old) => ({
      ...old,
      isLoading: false,
      data: response?.data.result.docs,
      total: response?.data.result.totalDocs,
    }));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoadingRows((prevState) => ({ ...prevState, [id]: true }));
      const response = await axiosJWT.delete(
        `${BASE_API_URL}/background/delete/${id}`,
        {
          headers: { token: `Bearer ${accessToken}` },
        },
      );
      fetchData();
      toast.success(response.data.message, toastTheme);
    } catch (e) {
      toast.error(e.response.data.message, toastTheme);
    } finally {
      setLoadingRows((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      width: 250,
      valueGetter: (params) => {
        return params.row._id;
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
    },
    {
      field: 'media',
      headerName: 'Media',
      width: 150,
      renderCell: (params) =>
        !params.row.isEmbed ? (
          <Link href={params.row.media.url} target="_blank">
            Click me
          </Link>
        ) : (
          '---'
        ),
    },
    {
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
        return (
          <LoadingButton
            loading={loadingRows[params.row._id]}
            variant="outlined"
            type="submit"
            onClick={() => handleDelete(params.row._id)}
          >
            <DeleteForeverIcon />
          </LoadingButton>
        );
      },
    },
  ];
  return (
    <>
      <NavigationBar />
      <BoxTop>
        <Box
          display="flex"
          gap={2}
          sx={{
            justifyContent: {
              md: 'space-between',
            },
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            Backgrounds Manager
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenModal(true)}
          >
            <AddIcon />
            Add background
          </Button>
        </Box>
        <Typography variant="caption" color="error" fontStyle="italic">
          Note*: After adding new data, refresh the page (f5) again to update
          the data.
        </Typography>
        <ModalAddBackground
          openModal={openModal}
          handleClose={() => setOpenModal(false)}
        />
        <Box marginY={2}>
          {pageState.data.length > 0 ? (
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
          ) : (
            <Typography variant="h5" fontWeight={700} component="div">
              No data
            </Typography>
          )}
        </Box>
      </BoxTop>
    </>
  );
}
