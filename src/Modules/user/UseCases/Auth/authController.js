const { AutenticateUserService } = require("./authService");

class AutenticateUserController {
  async authUsuer(request, response) {
    try {
      const { email, password } = request.body;

      const authService = new AutenticateUserService();

      const user = await authService.autenticatee();

      return response.status(200).json(spending);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}

module.exports = { AutenticateUserController };
