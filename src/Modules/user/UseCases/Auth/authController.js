const { AutenticateUserService } = require("./authService");

class AutenticateUserController {
  async authUsuer(request, response) {
    try {
      const { email, password } = request.body;

      const authService = new AutenticateUserService();

      const data = await authService.autenticate(email, password);
      console.log("data:", data.token);
      return response.status(200).json(data);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}

module.exports = { AutenticateUserController };
