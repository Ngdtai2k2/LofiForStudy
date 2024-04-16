import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BASE_API_URL } from './constants/constant';

const refreshToken = async (id, device) => {
  try {
    const res = await axios.post(
      BASE_API_URL + '/auth/refresh/' + id + '/' + device, null,
      {
        withCredentials: true,
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken(user?._id, user?.device);
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        if (stateSuccess) {
          dispatch(stateSuccess(refreshUser));
        }
        config.headers['token'] = 'Bearer ' + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    },
  );
  return newInstance;
};
