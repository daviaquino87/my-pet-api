const { supabase } = require("../../../../database/Supabase");

class AutenticateUserService {
  async autenticate(email, password) {
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    const data = {
      user,
      token: session.access_token,
    };

    return data;
  }
}

module.exports = { AutenticateUserService };
