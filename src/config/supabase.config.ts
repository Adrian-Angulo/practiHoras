import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ENV } from './env.config.js';

let supabaseAdminClient: SupabaseClient | null = null;
let supabaseAnonClient: SupabaseClient | null = null;

export const getSupabaseAdmin = (): SupabaseClient => {
  if (!supabaseAdminClient) {
    if (!ENV.SUPABASE_URL || !ENV.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn('⚠️ [Supabase] SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no configurados. Verifica tu archivo .env');
    }
    supabaseAdminClient = createClient(
      ENV.SUPABASE_URL || 'https://placeholder.supabase.co',
      ENV.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }
  return supabaseAdminClient;
};

export const getSupabaseAnon = (): SupabaseClient => {
  if (!supabaseAnonClient) {
    supabaseAnonClient = createClient(
      ENV.SUPABASE_URL || 'https://placeholder.supabase.co',
      ENV.SUPABASE_ANON_KEY || 'placeholder-anon-key'
    );
  }
  return supabaseAnonClient;
};
