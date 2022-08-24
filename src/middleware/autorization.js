const { jwtDecode } = require("../utils/jwtDecode");

function Autorization(request, response, next) {
  const token = request.headers;

  if (!token.authorization) {
    return response.status(401).json({ msg: "usuario não validado" });
  }

  const time = jwtDecode(token.authorization).exp;

  if (new Date(time * 1000).getTime() < new Date().getTime()) {
    return response.status(401).json({ msg: "falha na validação" });
  }

  next();
}

module.exports = { Autorization };
