/* ==========================================================
   AVENMARK ACCOUNTS — SUPABASE CONNECTION
========================================================== */


const SUPABASE_URL = "https://vmxyprcquykkzuemmjpn.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_-erMVaM3R2Y-ltyEXParPw_1Jj7PmQt";


const { createClient } = supabase;


const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
