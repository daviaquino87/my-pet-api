const { supabase } = require("../../../../database/Supabase");

class AutenticateUserService {
  async autenticate(email, password) {
    const { data: user, error } = await supabase
      .from("user")
      .select("email,password")
      .eq(`name:${email}` && `paseowd:${password}`);

    return user;
  }
}

module.exports = { AutenticateUserService };
