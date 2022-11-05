const User = require('../app/models/User');
const { encryptPassword } = require('../app/utils/helper');

module.exports = async () => {
  const data = [
    {
      email: 'user1@gmail.com',
      username: 'user1',
      password: await encryptPassword('12345'),
      role: 'user',
    },
    {
      email: 'user2@gmail.com',
      username: 'user2',
      password: await encryptPassword('12345'),
      role: 'user',
    },
    {
      email: 'user3@gmail.com',
      username: 'user3',
      password: await encryptPassword('12345'),
      role: 'user',
    },
  ];
  if (await User.countDocuments() === 0) await User.insertMany(data);
};
