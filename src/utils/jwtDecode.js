function jwtDecode(token) {
  const tokenDecode = JSON.parse(atob(token.split(".")[1]));

  return tokenDecode;
}

module.exports = { jwtDecode };
