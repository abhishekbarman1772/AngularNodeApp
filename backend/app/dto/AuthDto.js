const loginDto = (data, token) => ({
  user: {
    username: data.username,
    email: data.email,
    role: data.role,
  },
  token,
});

module.exports = {
  loginDto,
};
