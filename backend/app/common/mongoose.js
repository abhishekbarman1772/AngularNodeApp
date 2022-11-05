const mongoose = require('mongoose');
const { MONGO_URL } = require('../../config/const');

const connectToDb = () => mongoose.connect(
  MONGO_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
);

const disconnectToDb = () => mongoose.disconnect();

module.exports = {
  connectToDb,
  disconnectToDb,
};
