export const REFERRAL_PROGRAM_NAME = "Share the Mothership";

export const PROGRAM_SHORT_DESC = "Give $20 off a friend\u2019s first Mothership order (min $100). When they complete their first paid order (not cancelled within 14 days), you earn $20 in Mothership credit. Credits expire after 12 months.";

export const referralDefaults = {
  referee_discount_amount: 20, // USD
  referee_min_order: 100, // USD
  referrer_credit_amount: 20, // USD
  referral_code_expiry_days: 90,
  referrer_credit_expiry_months: 12,
  attribution_window_days: 30,
  order_hold_days_before_credit: 14,
  max_referrals_per_referrer_per_month: Infinity, // admin configurable
  one_time_referee_discount: true,
  reminder_to_referee: true, // 1 optional email within 7-14 days
  fraud_checks: true,
};

export const referralDeepLinkPrefix = "mothership://r/"; // future: configure web fallback
