const jwt = require('jsonwebtoken');
const { JWT_EXPIRES, JWT_SECRET } = require('../../config/const');

const signJwt = async (id) => {
  try {
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    return token;
  } catch (error) {
    return error.message;
  }
};

const verifyJwt = async (token) => {
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    return decode;
  } catch (error) {
    return error.message;
  }
};

const decodeJwt = async (token) => {
  try {
    const decode = jwt.decode(token);
    return decode;
  } catch (error) {
    return error.message;
  }
};

const getToken = async (req) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    return token;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  signJwt, verifyJwt, decodeJwt, getToken,
};
