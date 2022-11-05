require('dotenv').config({ path: `./config/${process.env.NODE_ENV}/.env` });

module.exports = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  JWT_EXPIRES: process.env.JWT_EXPIRES,
  JWT_SECRET: process.env.JWT_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  ALLOWED_PATHS: [
    '/api/V1/auth/login',
  ],
};
