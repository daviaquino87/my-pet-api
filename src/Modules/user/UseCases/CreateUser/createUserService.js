const { supabase } = require("../../../../database/Supabase");

class CreateUserService {
  async createUser(email, password) {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return user;
  }
}

module.exports = CreateUserService;
