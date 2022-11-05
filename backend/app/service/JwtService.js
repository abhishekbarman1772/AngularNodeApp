const { signJwt } = require('../utils/jwt');

class UserService {
  async registerJwt(id) {
    const token = await signJwt(id);
    return token;
  }
}

module.exports = UserService;
