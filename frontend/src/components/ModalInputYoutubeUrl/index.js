import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import YouTubeIcon from '@mui/icons-material/YouTube';

import './styles.css';

export default function ModalInputYoutubeUrl({
  openModal,
  handleClose,
  stateSetter,
}) {
  const validationSchema = Yup.object({
    url: Yup.string()
      .matches(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        'Please enter a valid YouTube URL!',
      )
      .required('Please enter a valid YouTube URL!'),
  });

  const formik = useFormik({
    initialValues: {
      url: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      stateSetter(values.url);
      handleClose();
      resetForm();
    },
  });

  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        className="modal-container"
        sx={{
          width: {
            xs: '100%',
            md: '50%',
          },
        }}
      >
        <TextField
          margin="normal"
          size="medium"
          variant="standard"
          label="Youtube url"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <YouTubeIcon color="light" />
              </InputAdornment>
            ),
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
          id="url"
          value={formik.values.url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.url && Boolean(formik.errors.url)}
          helperText={formik.touched.url && formik.errors.url}
          FormHelperTextProps={{ style: { color: 'red' } }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="light"
          sx={{ mt: 3, mb: 2, color: '#141414' }}
        >
          Ok
        </Button>
      </Box>
    </Modal>
  );
}
