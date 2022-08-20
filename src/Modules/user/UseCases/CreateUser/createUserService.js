const { supabase } = require("../../../../database/Supabase");

class CreateUserService {
  async createUser(name, email, password) {
    const data = await supabase.from("users").insert({
      name,
      email,
      password,
    });
    return data;
  }
}

module.exports = CreateUserService;
