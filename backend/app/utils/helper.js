const bcrypt = require('bcryptjs');

const saltRounds = 10;

const encryptPassword = async (password) => bcrypt.hashSync(password, saltRounds);

const compareHash = async (password, hashedPass) => bcrypt.compareSync(password, hashedPass);

const getPagination = async (query) => {
  const MAX_LIMIT = 100;
  const OFFSET = 0;

  const limit = query.limit && MAX_LIMIT;
  const skip = query.skip && OFFSET;

  return {
    limit, skip,
  };
};

module.exports = {
  encryptPassword,
  compareHash,
  getPagination,
};
