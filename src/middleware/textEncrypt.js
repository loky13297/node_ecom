var CryptoJS = require("crypto-js");
// Encrypt
const textEncrypt = (plainText) => {
  var ciphertext = CryptoJS.AES.encrypt(plainText, process.env.CRYPTO_JS_SECRET_KEY).toString();
  return ciphertext;
};

// Decrypt
const textDecrypt = (decryptedText) => {
  var bytes = CryptoJS.AES.decrypt(decryptedText, process.env.CRYPTO_JS_SECRET_KEY);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = {
  textEncrypt,
  textDecrypt,
};
