import 'server-only'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
// We will mute this line until you generate your Supabase types later!
// import type { Database } from '@/types/database'

export function createAdminClient() {
  // We changed <Database> to <any> right here:
  return createSupabaseClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}