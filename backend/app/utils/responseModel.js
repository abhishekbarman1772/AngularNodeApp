const successResponse = ({ res, message, data = null }) => res.send({ message, data });

module.exports = successResponse;
