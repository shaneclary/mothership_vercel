export type ReferralEventType =
  | "click"
  | "signup"
  | "redeemed"
  | "order_completed"
  | "order_cancelled";

export interface UserLite {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_member?: boolean;
  created_at: string;
}

export interface ReferralCode {
  id: string; // code row id
  user_id: string; // referrer
  code: string; // unique short code
  share_link: string;
  created_at: string;
  expires_at: string;
  max_uses: number; // default 1
  active: boolean;
}

export interface ReferralEvent {
  id: string;
  referral_code_id: string;
  referee_user_id?: string | null;
  referee_email?: string | null;
  session_id: string;
  event_type: ReferralEventType;
  order_id?: string | null;
  order_value?: number | null;
  created_at: string;
  flagged?: boolean; // potential fraud
}

export type CreditStatus = "pending" | "active" | "used" | "expired";

export interface Credit {
  id: string;
  user_id: string; // credit owner (referrer)
  amount: number;
  source: string; // e.g., referral:user_123
  status: CreditStatus;
  expires_at: string;
  created_at: string;
}

export interface ReferralRules {
  referee_discount_amount: number;
  referee_min_order: number;
  referrer_credit_amount: number;
  referral_code_expiry_days: number;
  referrer_credit_expiry_months: number;
  attribution_window_days: number;
  order_hold_days_before_credit: number;
  max_referrals_per_referrer_per_month: number;
  one_time_referee_discount: boolean;
  reminder_to_referee: boolean;
  fraud_checks: boolean;
}

export interface ReferralStats {
  user_id: string;
  total_referrals: number;
  successful_referrals: number;
  total_credits: number;
  last_referral_at?: string;
}
