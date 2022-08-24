const { supabase } = require("../../../../database/Supabase");

class AutenticateUserService {
  async autenticate(email, password) {
    // const { data: user, error } = await supabase
    //   .from("users")
    //   .select("email,password");
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    console.log(session);

    return user;
  }
}

module.exports = { AutenticateUserService };
