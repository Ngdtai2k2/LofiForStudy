import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { createAxios } from '../../createInstance';
import { BASE_API_URL, toastTheme } from '../../constants/constant';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  width: {
    xs: '95%',
    md: '50%',
  },
};
export default function ModalAddTodo({
  openModal,
  handleClose,
  setState,
  refreshData,
}) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;

  let axiosJWT = createAxios(user, dispatch);
  const validationSchema = Yup.object({
    title: Yup.string().required('Please enter a title!'),
    description: Yup.string(),
    deadline: Yup.date('This field must be a valid date!').min(
      new Date(),
      'Deadline date cannot be earlier than today',
    ),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      deadline: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axiosJWT.post(
          `${BASE_API_URL}/todo-list/create/${user._id}`,
          { ...values, user: user._id },
          {
            headers: { token: `Bearer ${accessToken}` },
            'Content-Type': 'multipart/form-data',
          },
        );
        resetForm();
        setState(true);
        handleClose();
        refreshData();
        toast.success(response.data.message, toastTheme);
      } catch (error) {
        toast.error('Error submitting form, please try again.', toastTheme);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <Modal open={openModal} onClose={handleClose}>
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={style}
            method="POST"
          >
            <Typography variant="h6">Add todo</Typography>

            <TextField
              margin="normal"
              size="small"
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              required
              fullWidth
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              margin="normal"
              size="small"
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              fullWidth
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <DateField
              style={{ width: '100%' }}
              required
              size="small"
              label="Deadline"
              sx={{ marginY: 1 }}
              value={formik.values.deadline}
              onChange={(date) => formik.setFieldValue('deadline', date)}
              helperText={formik.touched.deadline && formik.errors.deadline}
              onBlur={formik.handleBlur}
              error={formik.touched.deadline && Boolean(formik.errors.deadline)}
            />
            <Button
              variant="outlined"
              type="submit"
              sx={{
                marginTop: 2,
              }}
            >
              Add
            </Button>
          </Box>
        </LocalizationProvider>
      </>
    </Modal>
  );
}
