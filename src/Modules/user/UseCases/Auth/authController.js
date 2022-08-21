const { AutenticateUserService } = require("./authService");

class AutenticateUserController {
  async authUsuer(request, response) {
    try {
      const { email, password } = request.body;

      const authService = new AutenticateUserService();

      const user = await authService.autenticate(email, password);

      return response.status(200).json(user);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}

module.exports = { AutenticateUserController };
