const { supabase } = require("../../../../database/Supabase");

class LogoutUserService {
  async logout(token) {
    const { error, ...a } = await supabase.auth.api.signOut(token);

    return Promise.resolve(true);
  }
}

module.exports = { LogoutUserService };
