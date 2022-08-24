const { LogoutUserService } = require("./logoutUserService");

class LogoutUserControll {
  logoutUser(request, response) {
    try {
      const token = request.headers.authorization;
      console.log("token :", token);
      const logoutService = new LogoutUserService();

      const data = logoutService.logout(token);

      return response.status(200).json({ msg: "signed successfull" });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ msg: "not signed successfull" });
    }
  }
}

module.exports = { LogoutUserControll };
