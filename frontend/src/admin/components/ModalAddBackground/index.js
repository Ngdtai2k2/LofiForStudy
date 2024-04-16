import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { createAxios } from '../../../createInstance';
import { BASE_API_URL, toastTheme } from '../../../constants/constant';
import { toast } from 'react-toastify';

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

export default function ModalAddBackground({ openModal, handleClose }) {
  const [fetching, setFetching] = useState();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;

  let axiosJWT = createAxios(user, dispatch);

  const validationSchema = Yup.object({
    description: Yup.string(),
    file: Yup.mixed()
      .nullable()
      .test('fileType', 'File not supported!', (value) => {
        if (!value) return true;
        const audioTypes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/gif',
        ];
        return value && audioTypes.includes(value.type);
      }),
  });

  const formik = useFormik({
    initialValues: {
      description: '',
      file: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setFetching(true);
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (value !== null && key !== 'file') {
            formData.append(key, value);
          }
        });
        formData.append('file', values.file);

        const res = await axiosJWT.post(
          `${BASE_API_URL}/background/create`,
          formData,
          {
            headers: { token: `Bearer ${accessToken}` },
            'Content-Type': 'multipart/form-data',
          },
        );
        resetForm();
        document.getElementById('file').value = '';
        toast.success(res.data.message, toastTheme);
      } catch (e) {
        toast.error(e.response.data.message, toastTheme);
      } finally {
        setFetching(false);
      }
    },
  });

  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={style}
        method="POST"
      >
        <Typography variant="h6" textAlign="center">
          Add New Background
        </Typography>
        <TextField
          margin="normal"
          size="small"
          fullWidth
          required
          id="description"
          label="Description"
          type="text"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <Box display="flex" flexDirection="column" marginTop={2}>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onBlur={formik.handleBlur}
            onChange={(event) => {
              formik.setFieldValue('file', event.currentTarget.files[0]);
            }}
          />
          <Typography variant="caption" marginTop={0.5}></Typography>
          {formik.touched.file && formik.errors.file && (
            <Typography variant="caption" color="error">
              {formik.errors.file}
            </Typography>
          )}
        </Box>
        <Box display="flex" justifyContent="center" marginTop={3}>
          <LoadingButton
            loading={fetching ? fetching : false}
            variant="outlined"
            type="submit"
          >
            Add
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
}
