import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import { registerUser } from '../../../redux/apiRequest/authApi';

export default function Signup({ setTabIndex }) {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Register a new account';
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address!')
      .max(50, 'Emails must be less than 50 characters!')
      .required('Email is required!'),
    password: Yup.string()
      .required('Password is required!')
      .min(8, 'Password is too short - should be 8 chars minimum!'),
    fullname: Yup.string()
      .required('Full name is required!')
      .matches(/^[^\d]+$/, 'Full name cannot contain digits'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      fullname: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await registerUser(values, dispatch, setTabIndex);
    },
  });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      sx={{ mt: 1 }}
      method="POST"
    >
      <TextField
        margin="normal"
        size="small"
        required
        fullWidth
        id="fullname"
        label="Full Name"
        name="fullname"
        autoComplete="fullname"
        value={formik.values.fullname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
        helperText={formik.touched.fullname && formik.errors.fullname}
      />
      <TextField
        margin="normal"
        size="small"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        margin="normal"
        size="small"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Grid container>
        <Grid item>
          <Link
            onClick={() => {
              setTabIndex(0);
            }}
            variant="body2"
          >
            Already have an account? Sign in now!
          </Link>
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>
    </Box>
  );
}
