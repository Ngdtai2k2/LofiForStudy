import axios from 'axios';

import {
  changePasswordFailed,
  changePasswordStart,
  changePasswordSuccess,
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from '../slice/userSlice';

import { toast } from 'react-toastify';
import { toastTheme, BASE_API_URL } from '../../constants/constant';

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(BASE_API_URL + '/auth/login', user);
    dispatch(loginSuccess(res.data));
    toast.success(res.data.message, toastTheme);
    navigate('/music');
    window.location.reload();
  } catch (err) {
    dispatch(loginFailed(err.response.data));
    toast.error(err.response.data.message, toastTheme);
  }
};

export const registerUser = async (user, dispatch, setTabIndex) => {
  dispatch(registerStart());
  try {
    await axios.post(BASE_API_URL + '/auth/register', user);
    dispatch(registerSuccess());
    toast.success('Successful account registration!', toastTheme);
    setTabIndex(0);
  } catch (err) {
    toast.error(err.response.data.message, toastTheme);
    dispatch(registerFailed());
  }
};

export const logOut = async (
  dispatch,
  id,
  device,
  navigate,
  accessToken,
  axiosJWT,
) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post(
      BASE_API_URL + '/auth/logout',
      { id, device },
      {
        headers: { token: `Bearer ${accessToken}` },
        'Content-Type': 'multipart/form-data',
      },
    );
    dispatch(logOutSuccess());
    toast.success('Logged out successfully!', toastTheme);
    navigate('/music');
    window.location.reload();
  } catch (err) {
    dispatch(logOutFailed());
  }
};

export const changePassword = async (
  dispatch,
  id,
  accessToken,
  axiosJWT,
  userData,
) => {
  dispatch(changePasswordStart());
  try {
    const res = await axiosJWT.put(
      BASE_API_URL + '/auth/password/' + id,
      userData,
      {
        headers: { token: `Bearer ${accessToken}` },
      },
    );
    dispatch(changePasswordSuccess());
    toast.success(res.data.message, toastTheme);
  } catch (err) {
    dispatch(changePasswordFailed());
    toast.error(err.response.data.message, toastTheme);
  }
};
