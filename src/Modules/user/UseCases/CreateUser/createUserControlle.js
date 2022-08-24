const { uuid: v4 } = require("uuid");

const CreateUserService = require("./createUserService");

class CreateUserController {
  async createUser(request, response) {
    try {
      let { email, password } = request.body;

      if (password.length <= 6) {
        return response
          .status(400)
          .json({ msg: "your password is very short" });
      }

      const UserCreate = new CreateUserService();
      const data = await UserCreate.createUser(email, password);

      return response.status(201).json(data);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}

module.exports = { CreateUserController };
