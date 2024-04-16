const CryptoJS = require('crypto-js');
const dotenv = require("dotenv");

dotenv.config();

const encryptToken = (token) => {
  const encryptedToken = CryptoJS.AES.encrypt(token, process.env.SECRET_KEY).toString();
  return encryptedToken;
};

const decryptToken = (encryptedToken) => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, process.env.SECRET_KEY);
  const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedToken;
};

module.exports = {
  encryptToken,
  decryptToken,
};
