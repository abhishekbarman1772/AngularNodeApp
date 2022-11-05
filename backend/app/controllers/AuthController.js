const Users = require('../models/User');
const NotFoundError = require('../errorhandler/NotFoundError');
const InvalidInputError = require('../errorhandler/InvalidInputError');
const successResponse = require('../utils/responseModel');
const Jwt = require('../service/JwtService');
const { compareHash } = require('../utils/helper');
const { loginDto } = require('../dto/AuthDto');

const jwtService = new Jwt();

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    const userData = await Users.findOne({ email });
    if (!userData) throw new NotFoundError('User is not valid');
    if (!await compareHash(password, userData.password)) {
      throw new NotFoundError('User password is incorrect');
    }
    const token = await jwtService.registerJwt(userData.id);
    req.session.token = token;
    return successResponse({
      res,
      message: 'user logged In',
      data: loginDto(userData, token),
    });
  }

  async logout(req, res) {
    req.session.destroy(async (err) => {
      if (err) throw new InvalidInputError();
      return successResponse({
        res,
        message: 'user logged Out',
      });
    });
  }
}

module.exports = AuthController;
