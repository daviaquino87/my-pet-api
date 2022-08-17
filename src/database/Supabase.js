const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const supabase = createClient(process.env.URL, process.env.KEY);

module.exports = { supabase };
