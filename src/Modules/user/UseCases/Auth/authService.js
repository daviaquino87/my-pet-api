const { supabase } = require("../../../../database/Supabase");

class AutenticateUserService {
  async autenticate(email, password) {
    const { data: user, error } = await supabase
      .from("users")
      .select("email,password");

    return user;
  }
}

module.exports = { AutenticateUserService };
