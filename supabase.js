const SUPABASE_URL = "https://kqtchjmubgrwsmuyatow.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_u8C-LPE7C2RjlLNqn7FvZA_Df_plSYI";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);