import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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

export default function ModalAddSong({ openModal, handleClose }) {
  const [selectedInput, setSelectedInput] = useState(null);
  const [fetching, setFetching] = useState();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;

  let axiosJWT = createAxios(user, dispatch);

  const validationSchema = Yup.object({
    title: Yup.string().required('Please enter a title!'),
    artist: Yup.string(),
    description: Yup.string(),
    profileUrl: Yup.string().url(),
    urlYoutube: Yup.string().matches(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      'Please enter a valid YouTube URL!',
    ),
    file: Yup.mixed()
      .nullable()
      .test('fileType', 'File not supported!', (value) => {
        if (!value) return true;
        const audioTypes = [
          'audio/mp3',
          'audio/wav',
          'audio/wma',
          'audio/mpeg',
        ];
        return value && audioTypes.includes(value.type);
      }),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      artist: '',
      description: '',
      profileUrl: '',
      urlYoutube: '',
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
          `${BASE_API_URL}/audio/create`,
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

  const handleCheckboxChange = (type) => {
    setSelectedInput(type);
  };

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
          Add New Song
        </Typography>
        <TextField
          margin="normal"
          size="small"
          fullWidth
          required
          id="title"
          label="Title"
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          margin="normal"
          size="small"
          fullWidth
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
        <Box>
          <FormControlLabel
            label="File"
            control={<Checkbox onChange={() => handleCheckboxChange('file')} />}
            checked={selectedInput === 'file'}
          />
          <FormControlLabel
            label="Url"
            control={<Checkbox onChange={() => handleCheckboxChange('text')} />}
            checked={selectedInput === 'text'}
          />
        </Box>
        {selectedInput === 'text' && (
          <TextField
            margin="normal"
            size="small"
            fullWidth
            id="urlYoutube"
            label="URL Youtube"
            type="text"
            value={formik.values.urlYoutube}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.urlYoutube && Boolean(formik.errors.urlYoutube)
            }
            helperText={formik.touched.urlYoutube && formik.errors.urlYoutube}
          />
        )}
        {selectedInput === 'file' && (
          <>
            <Box display="flex" flexDirection="column" marginTop={2}>
              <input
                type="file"
                id="file"
                name="file"
                accept="audio/*"
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
            <TextField
              margin="normal"
              size="small"
              fullWidth
              id="artist"
              label="Artist"
              type="text"
              value={formik.values.artist}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.artist && Boolean(formik.errors.artist)}
              helperText={formik.touched.artist && formik.errors.artist}
            />
            <TextField
              margin="normal"
              size="small"
              fullWidth
              id="profileUrl"
              label="Profile Url (Social networking)"
              type="text"
              value={formik.values.profileUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.profileUrl && Boolean(formik.errors.profileUrl)
              }
              helperText={formik.touched.profileUrl && formik.errors.profileUrl}
            />
          </>
        )}
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
