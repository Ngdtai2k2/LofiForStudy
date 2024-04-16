const CryptoJS = require('crypto-js');
const dotenv = require("dotenv");

dotenv.config();

const encryptToken = (token) => {
  const encryptedToken = CryptoJS.AES.encrypt(token, process.env.SECRET_KEY).toString();
  return encryptedToken;
};

const decryptToken = (encryptedToken) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, process.env.SECRET_KEY);
    if (bytes.sigBytes === 0) {
      throw new Error('Invalid token');
    }
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken;
  } catch (error) {
    return null;
  }
};

module.exports = {
  encryptToken,
  decryptToken,
};
