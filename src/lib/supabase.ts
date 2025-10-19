import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for rewards system
export type PointsTransaction = {
  id: string
  user_id: string
  points: number
  type: 'earn' | 'redeem'
  category: string
  description: string
  reference_id?: string
  created_at: string
}

export type UserBadge = {
  id: string
  user_id: string
  badge_code: string
  earned_at: string
}

export type Challenge = {
  id: string
  title: string
  description?: string
  points_reward: number
  badge_reward?: string
  start_date?: string
  end_date?: string
  is_active: boolean
  requirements?: Record<string, unknown>
  created_at: string
}

export type UserChallengeProgress = {
  id: string
  user_id: string
  challenge_id: string
  progress?: Record<string, unknown>
  completed: boolean
  completed_at?: string
}
