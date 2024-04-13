import { Flip } from 'react-toastify';

export const toastTheme = {
  autoClose: 3000,
  theme: 'colored',
  transition: Flip,
};

export const BASE_API_URL = process.env.REACT_APP_BASE_URL;

export const BASE_API_ADMIN_URL = process.env.REACT_APP_BASE_URL + '/admin';

export const YOUTUBE_URL = process.env.REACT_APP_YOUTUBE_URL;

export const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const YOUTUBE_API_URL = process.env.REACT_APP_YOUTUBE_API_URL;

export const DEFAULT_MUSIC = 'https://www.youtube.com/watch?v=jfKfPfyJRdk';
