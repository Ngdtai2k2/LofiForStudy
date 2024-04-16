import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../constants/constant';

export const encryptToken = (token) => {
  const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  return encryptedToken;
};

export const decryptToken = (encryptedToken) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    if (bytes.sigBytes === 0) {
      throw new Error('Invalid token');
    }
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken;
  } catch (error) {
    return null;
  }
};
