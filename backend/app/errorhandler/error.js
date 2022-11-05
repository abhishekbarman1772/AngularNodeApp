const CustomError = require('./Exception');

const errorHandler = async function (error, req, res, next) {
  if (error instanceof CustomError) {
    return res.status(error.status)
      .json({
        status: error.code,
        message: error.message,
      });
  }
  res.status(500).send({
    error: true,
    message: 'Internal Server Error',
  });
};

module.exports = errorHandler;
