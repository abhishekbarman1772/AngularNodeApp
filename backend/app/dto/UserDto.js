const getUserDto = (user) => ({
  user: {
    username: user.username,
    email: user.email,
    role: user.role,
  },
});

const createUserDto = (user, token) => ({
  user: {
    username: user.username,
    email: user.email,
    role: user.role,
  },
  token,
});

const updateUserDto = (user) => ({
  username: user.username,
  email: user.email,
  role: user.role,
});

module.exports = {
  createUserDto,
  updateUserDto,
  getUserDto,
};
