import { referralDefaults, referralDeepLinkPrefix } from "../config/referrals";
import { useReferralsStore } from "../state/storage/referralsStore";
import type { ReferralCode, ReferralEvent, ReferralRules } from "../types/referrals";
import * as Application from "expo-application";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

const ATTRIBUTION_KEY = "mothership_referral_attribution";

const genCode = () => Math.random().toString(36).slice(2, 8).toUpperCase();

export async function generateReferralCode(userId: string) {
  const store = useReferralsStore.getState();
  const now = new Date();
  const existing = store.referral_codes.find(
    (c) => c.user_id === userId && c.active && new Date(c.expires_at) > now
  );
  if (existing) {
    return existing;
  }
  const expires = new Date();
  expires.setDate(expires.getDate() + referralDefaults.referral_code_expiry_days);
  const code: ReferralCode = {
    id: uuidv4(),
    user_id: userId,
    code: genCode(),
    share_link: `${referralDeepLinkPrefix}${genCode()}`,
    created_at: now.toISOString(),
    expires_at: expires.toISOString(),
    max_uses: 1,
    active: true,
  };
  useReferralsStore.getState().upsertReferralCode(code);
  return code;
}

export async function handleReferralClick(code: string) {
  const store = useReferralsStore.getState();
  const rc = store.referral_codes.find((c) => c.code === code && c.active);
  if (!rc) return false;
  const session_id = (await Application.getAndroidId()) || Application.applicationId || "unknown";
  store.addEvent({ referral_code_id: rc.id, session_id, event_type: "click" });
  await AsyncStorage.setItem(
    ATTRIBUTION_KEY,
    JSON.stringify({ code, ts: Date.now() })
  );
  return true;
}

export async function attachReferralOnSignup(refereeUserId: string, refereeEmail?: string) {
  const raw = await AsyncStorage.getItem(ATTRIBUTION_KEY);
  if (!raw) return;
  const { code, ts } = JSON.parse(raw);
  const within = Date.now() - ts < referralDefaults.attribution_window_days * 86400000;
  if (!within) return;
  const store = useReferralsStore.getState();
  const rc = store.referral_codes.find((c) => c.code === code);
  if (!rc) return;
  const session_id = (await Application.getAndroidId()) || Application.applicationId || "unknown";
  store.addEvent({ referral_code_id: rc.id, session_id, event_type: "signup", referee_user_id: refereeUserId, referee_email: refereeEmail });
}

export async function redeemAtCheckout(params: { code: string; orderId: string; orderValue: number; refereeUserId: string; refereeEmail?: string; }) {
  const { code, orderId, orderValue, refereeUserId, refereeEmail } = params;
  const store = useReferralsStore.getState();
  const rc = store.referral_codes.find((c) => c.code === code && c.active);
  if (!rc) return { ok: false, reason: "invalid_code" } as const;

  if (orderValue < referralDefaults.referee_min_order) return { ok: false, reason: "min_order" } as const;

  if (rc.user_id === refereeUserId) return { ok: false, reason: "self_referral" } as const;

  // one-time per referee
  const already = store.referral_events.find(e => e.referee_user_id === refereeUserId && e.event_type === "redeemed");
  if (already) return { ok: false, reason: "already_used" } as const;

  const session_id = (await Application.getAndroidId()) || Application.applicationId || "unknown";
  store.addEvent({ referral_code_id: rc.id, session_id, event_type: "redeemed", order_id: orderId, order_value: orderValue, referee_user_id: refereeUserId, referee_email: refereeEmail });

  return { ok: true, discount: referralDefaults.referee_discount_amount } as const;
}

export async function processPendingReferrals(now = new Date()) {
  const store = useReferralsStore.getState();
  const redeemed = store.referral_events.filter(e => e.event_type === "redeemed");
  const holdMs = referralDefaults.order_hold_days_before_credit * 86400000;
  redeemed.forEach((e) => {
    const age = now.getTime() - new Date(e.created_at).getTime();
    if (age < holdMs) return;

    // if order_cancelled exists for same order_id, skip
    const cancelled = store.referral_events.find(x => x.order_id && x.order_id === e.order_id && x.event_type === "order_cancelled");
    if (cancelled) return;

    const rc = store.referral_codes.find(c => c.id === e.referral_code_id);
    if (!rc) return;

    const exp = new Date();
    exp.setMonth(exp.getMonth() + referralDefaults.referrer_credit_expiry_months);

    // create credit for referrer
    useReferralsStore.getState().addCredit({
      user_id: rc.user_id,
      amount: referralDefaults.referrer_credit_amount,
      source: `referral:${rc.user_id}`,
      status: "active",
      expires_at: exp.toISOString(),
    });

    // log completion
    store.addEvent({ referral_code_id: rc.id, session_id: "system", event_type: "order_completed", order_id: e.order_id, order_value: e.order_value });
  });
}

export async function applyCredits(userId: string, amount: number) {
  const store = useReferralsStore.getState();
  const { active } = store.getUserCredits(userId);
  let remaining = amount;
  for (const c of active) {
    if (remaining <= 0) break;
    const useAmt = Math.min(remaining, c.amount);
    remaining -= useAmt;
    useReferralsStore.getState().updateCredit(c.id, { status: useAmt === c.amount ? "used" : "active", amount: c.amount - useAmt });
  }
  return amount - remaining;
}
