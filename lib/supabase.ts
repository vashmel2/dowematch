import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Lazy clients — initialized on first use, not at import time
let _supabase: SupabaseClient | null = null
let _supabaseAdmin: SupabaseClient | null = null

export function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return _supabase
}

export function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return _supabaseAdmin
}


export interface Session {
  id: string
  mode: 'dating' | 'married' | 'friends' | 'situationship'
  created_at: string
  expires_at: string
  person1_name: string | null
  person1_answers: string[] | null
  person1_done: boolean
  person2_name: string | null
  person2_answers: string[] | null
  person2_done: boolean
  ai_result: AIResult | null
  result_generated: boolean
}

export interface AIResult {
  score: number
  label: string
  report: string
  strength: string
  watchout: string
}
