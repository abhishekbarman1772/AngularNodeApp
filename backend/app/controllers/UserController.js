const Users = require('../models/User');
const { encryptPassword } = require('../utils/helper');
const successResponse = require('../utils/responseModel');
const Jwt = require('../service/JwtService');
const User = require('../models/User');
const InvalidInputError = require('../errorhandler/InvalidInputError');
const { createUserDto, updateUserDto, getUserDto } = require('../dto/UserDto');

const jwtService = new Jwt();

class UserController {
  async get(req, res) {
    return successResponse({
      res,
      message: 'user details',
      data: getUserDto(req.user),
    });
  }

  async create(req, res) {
    const { email, password, username } = req.body;
    if (await User.findOne({ email })) throw new InvalidInputError('Email already exists');
    const userData = await Users.create(
      { email, password: await encryptPassword(password), username },
    );
    const token = await jwtService.registerJwt(userData.id);
    return successResponse({
      res,
      message: 'user created',
      data: createUserDto(userData, token),
    });
  }

  async update(req, res) {
    const { email, password, username } = req.body;
    const { userId } = req.params;
    if (await User.findOne({ _id: { $ne: userId }, email })) throw new InvalidInputError('email already exists');
    const userData = await Users.findByIdAndUpdate(
      userId,
      { email, password: await encryptPassword(password), username },
    );
    return successResponse({
      res,
      message: 'user updated',
      data: updateUserDto(userData),
    });
  }
}

module.exports = UserController;
