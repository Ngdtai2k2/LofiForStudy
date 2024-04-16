import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../constants/constant';

export const encryptToken = (token) => {
  const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  return encryptedToken;
};

export const decryptToken = (encryptedToken) => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
  const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedToken;
};
