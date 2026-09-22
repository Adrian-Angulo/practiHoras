"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupabaseAnon = exports.getSupabaseAdmin = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const env_config_js_1 = require("./env.config.js");
let supabaseAdminClient = null;
let supabaseAnonClient = null;
const getSupabaseAdmin = () => {
    if (!supabaseAdminClient) {
        if (!env_config_js_1.ENV.SUPABASE_URL || !env_config_js_1.ENV.SUPABASE_SERVICE_ROLE_KEY) {
            console.warn('⚠️ [Supabase] SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no configurados. Verifica tu archivo .env');
        }
        supabaseAdminClient = (0, supabase_js_1.createClient)(env_config_js_1.ENV.SUPABASE_URL || 'https://placeholder.supabase.co', env_config_js_1.ENV.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key', {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });
    }
    return supabaseAdminClient;
};
exports.getSupabaseAdmin = getSupabaseAdmin;
const getSupabaseAnon = () => {
    if (!supabaseAnonClient) {
        supabaseAnonClient = (0, supabase_js_1.createClient)(env_config_js_1.ENV.SUPABASE_URL || 'https://placeholder.supabase.co', env_config_js_1.ENV.SUPABASE_ANON_KEY || 'placeholder-anon-key');
    }
    return supabaseAnonClient;
};
exports.getSupabaseAnon = getSupabaseAnon;
//# sourceMappingURL=supabase.config.js.map