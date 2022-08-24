const { supabase } = require("../../../../database/Supabase");

class CreateUserService {
  async createUser(email, password) {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    return user;
  }
}

module.exports = CreateUserService;
