// ============================================================
// MOTHERSHIP REWARD ENGINE – SYSTEM SPEC v1.0
// Money-machine that nourishes mamas
// ============================================================

export const REWARD_ENGINE_CONFIG = {
  system: {
    pointsExchangeRate: {
      base: 10,         // 10 pts = $0.01
      inverse: 1000,    // 1000 pts = $1.00
    },
    currencyLabel: "Circle Credits",
    pointExpirationDays: 180,          // points older than 6 months expire
    monthlyResetDay: 1,
    roundingPolicy: 'floor' as const,  // always round down fractional pts
  },

  // ============================================================
  // USER TIERS - Revenue-driven progression
  // ============================================================
  tiers: [
    {
      id: 1,
      name: 'Supporter',
      referralBonusPct: 0.02,           // 2% of referred sale
      unlockThresholdUsd: 0,            // default entry level
      emoji: '🌱',
      description: 'Beginning your journey of care',
    },
    {
      id: 2,
      name: 'Guardian',
      referralBonusPct: 0.04,           // 4% of referred sale
      unlockThresholdUsd: 1000,         // $1k lifetime referred revenue
      emoji: '🌿',
      description: 'Growing a circle of care',
    },
    {
      id: 3,
      name: 'Matriarch',
      referralBonusPct: 0.06,           // 6% of referred sale
      unlockThresholdUsd: 3000,         // $3k lifetime referred revenue
      emoji: '🌸',
      description: 'Leading with wisdom and care',
      perks: [
        'Early access to seasonal drops',
        'Priority customer support',
      ],
    },
    {
      id: 4,
      name: 'Elder',
      referralBonusPct: 0.08,           // 8% of referred sale
      unlockThresholdUsd: 10000,        // $10k lifetime referred revenue
      emoji: '🏡',
      description: 'A pillar of the community',
      perks: [
        'Exclusive seasonal drop access',
        'Priority customer support',
        'Invite to annual founders gathering',
        'Ambassador program eligibility',
      ],
    },
  ],

  // ============================================================
  // EARNING LIMITS & DIMINISHING RULES
  // ============================================================
  earningLimits: {
    engagementGlobalMonthlyCapPoints: 8000,    // $8 max per user/month for non-revenue
    engagementDiminishingMultiplier: 0.5,      // 50% reduction after threshold
    referralMonthlyCap: null,                  // unlimited (direct revenue)
    upsellMonthlyCap: null,                    // unlimited (direct revenue)
  },

  // ============================================================
  // REDEMPTION RULES
  // ============================================================
  redemption: {
    minRedeemPoints: 5000,                     // $5 equivalent
    eligibleConditions: {
      any: [
        { type: 'min_referrals', count: 2 },
        { type: 'completed_purchase', value: true },
      ],
    },
    options: [
      { id: 'store_credit', label: 'Store Credit', description: 'Apply to your next order' },
      { id: 'gift_mama', label: 'Gift to New Mama', description: 'Share the nourishment' },
      { id: 'donation_pool', label: 'Mama in Need Fund', description: 'Support the community' },
    ],
    decaySchedule: [
      { afterDays: 180, decayPercent: 0.5, message: 'Points reduced by 50% after 6 months' },
      { afterDays: 270, decayPercent: 1.0, message: 'Points fully expired after 9 months' },
    ],
  },

  // ============================================================
  // ANALYTICS & HEALTH METRICS
  // ============================================================
  analytics: {
    track: [
      'total_points_issued',
      'points_redeemed',
      'cac_referral_credits_usd',
      'ltv_per_user_usd',
      'ltv_to_cac_ratio',
      'payback_days',
      'engagement_to_revenue_ratio',
    ],
    healthTargets: {
      ltvToCacRatioMin: 3.0,
      grossMarginTargetPct: 60,
      paybackDaysTarget: 30,
      engagementCostMaxPct: 10,          // engagement costs < 10% of gross profit
    },
  },

  // ============================================================
  // AUTOMATION TRIGGERS
  // ============================================================
  automation: {
    notifications: [
      {
        trigger: 'near_monthly_goal',
        threshold: 0.9,
        message: 'Amazing! You are at 90% of your monthly engagement goal — almost there!',
        action: 'email_and_portal',
      },
      {
        trigger: 'points_expiring_soon',
        daysBefore: 30,
        message: 'Some of your Circle Credits will expire in 30 days — redeem or share to extend!',
        action: 'email_and_portal',
      },
      {
        trigger: 'tier_level_up',
        message: 'A new bloom opens — you have reached {tier_name}!',
        action: 'confetti_and_badge',
      },
      {
        trigger: 'referral_milestone',
        thresholds: [5, 10, 25, 50, 100],
        message: 'Your care ripples outward — {count} mamas nourished through you!',
        action: 'special_badge',
      },
    ],
  },
} as const

// ============================================================
// REWARD ACTIONS SCHEMA
// ============================================================

export type RewardActionType = 'revenue' | 'engagement'

export interface RewardAction {
  id: string
  type: RewardActionType
  category: 'referral' | 'purchase' | 'upsell' | 'community' | 'milestone' | 'validation'
  trigger: string
  description: string

  // Rewards structure
  rewards: {
    referrerCreditUsd?: number
    buyerCreditUsd?: number
    referrerPointsPctOfSale?: string  // e.g., "tier.referralBonusPct"
    pointsPctOfSale?: number
    rewardPoints?: number
  }

  // Caps & limits (for engagement actions)
  monthlyCapPoints?: number
  diminishingAfter?: number
  maxPerDay?: number

  // Requirements
  minOrderValueUsd?: number
  eligibleProducts?: string[]
  requiresApproval?: boolean

  // Metadata
  notes?: string
}

export const REWARD_ACTIONS: RewardAction[] = [
  // ========== REVENUE-GENERATING ACTIONS (UNCAPPED) ==========
  {
    id: 'referral_purchase',
    type: 'revenue',
    category: 'referral',
    trigger: 'when referred_user completes paid order',
    description: 'Share the circle of care',
    rewards: {
      referrerCreditUsd: 20,
      buyerCreditUsd: 20,
      referrerPointsPctOfSale: 'tier.referralBonusPct',
    },
    minOrderValueUsd: 50,
    notes: 'Primary CAC engine. No monthly cap. Points calculated on gross order total before discounts.',
  },
  {
    id: 'upsell_addon',
    type: 'revenue',
    category: 'upsell',
    trigger: 'customer adds any upsell item pre-checkout',
    description: 'Enhance your nourishment ritual',
    rewards: {
      pointsPctOfSale: 0.01,  // 1% back in points
    },
    eligibleProducts: ['herbal_tea', 'bone_broth', 'postpartum_ritual_kit'],
  },
  {
    id: 'direct_purchase',
    type: 'revenue',
    category: 'purchase',
    trigger: 'repeat order or subscription renewal',
    description: 'Consistent care for you',
    rewards: {
      pointsPctOfSale: 0.005,  // 0.5% loyalty back
    },
    notes: 'Loyalty drip; encourages retention.',
  },

  // ========== NON-REVENUE ENGAGEMENT ACTIONS (CAPPED) ==========
  {
    id: 'post_reply',
    type: 'engagement',
    category: 'community',
    trigger: 'approved reply on community thread',
    description: 'Build connection',
    rewards: {
      rewardPoints: 100,
    },
    monthlyCapPoints: 1500,    // 15 replies rewarded max/month
    diminishingAfter: 10,      // beyond 10 replies = 50% pts
    requiresApproval: true,
  },
  {
    id: 'new_post',
    type: 'engagement',
    category: 'community',
    trigger: 'approved new post or reflection',
    description: 'Your journey matters',
    rewards: {
      rewardPoints: 500,
    },
    monthlyCapPoints: 4000,    // ~8 posts
    diminishingAfter: 5,       // half pts after 5th
    requiresApproval: true,
  },
  {
    id: 'monthly_checkin',
    type: 'engagement',
    category: 'milestone',
    trigger: 'user completes monthly reflection prompt',
    description: 'Growth recognized',
    rewards: {
      rewardPoints: 1000,
    },
    monthlyCapPoints: 1000,    // once per month
  },
  {
    id: 'milestone_badge',
    type: 'engagement',
    category: 'milestone',
    trigger: 'system-verified self-care milestone',
    description: 'Your care creates beauty',
    rewards: {
      rewardPoints: 2000,
    },
    monthlyCapPoints: 4000,    // up to 2 per month
  },
  {
    id: 'peer_endorsement',
    type: 'engagement',
    category: 'validation',
    trigger: 'post receives 3+ positive reactions',
    description: 'Your kindness ripples outward',
    rewards: {
      rewardPoints: 300,
    },
    monthlyCapPoints: 1500,
    requiresApproval: true,
    notes: 'Requires moderation check; prevents spam likes.',
  },
]

// ============================================================
// UPSELL PRODUCTS
// ============================================================

export interface UpsellProduct {
  id: string
  title: string
  description: string
  priceUsd: number
  rewardPoints: number
  inventorySku: string
  image?: string
  category: 'ritual' | 'nourishment' | 'care'
}

export const UPSELL_PRODUCTS: UpsellProduct[] = [
  {
    id: 'herbal_tea',
    title: 'Soothing Herbal Tea Blend',
    description: 'Calm your nervous system with organic chamomile, lavender & rose',
    priceUsd: 12,
    rewardPoints: 120,
    inventorySku: 'TEA-01',
    category: 'ritual',
  },
  {
    id: 'bone_broth',
    title: 'Mineral-Rich Bone Broth',
    description: 'Restore with collagen-rich, slow-simmered nourishment',
    priceUsd: 18,
    rewardPoints: 180,
    inventorySku: 'BROTH-02',
    category: 'nourishment',
  },
  {
    id: 'postpartum_ritual_kit',
    title: 'Postpartum Ritual Kit',
    description: 'Sacred self-care essentials for your matrescence journey',
    priceUsd: 28,
    rewardPoints: 280,
    inventorySku: 'KIT-03',
    category: 'care',
  },
]

export const UPSELL_MODULE_CONFIG = {
  placement: 'pre-payment',
  promptText: 'Would you like to add a ritual of nourishment?',
  bundleDiscount: {
    triggerMinItems: 2,
    discountPct: 10,
    message: 'Add 2+ items and save 10%',
  },
}

// ============================================================
// TYPE EXPORTS
// ============================================================

export type RewardTier = typeof REWARD_ENGINE_CONFIG.tiers[number]
export type RedemptionOption = typeof REWARD_ENGINE_CONFIG.redemption.options[number]
export type AutomationNotification = typeof REWARD_ENGINE_CONFIG.automation.notifications[number]

// Helper to calculate points from USD
export function usdToPoints(usd: number): number {
  return Math.floor(usd * REWARD_ENGINE_CONFIG.system.pointsExchangeRate.inverse)
}

// Helper to calculate USD from points
export function pointsToUsd(points: number): number {
  return points / REWARD_ENGINE_CONFIG.system.pointsExchangeRate.inverse
}

// Helper to get tier by lifetime revenue
export function getTierByRevenue(lifetimeReferredUsd: number): RewardTier {
  const tiers = REWARD_ENGINE_CONFIG.tiers
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (lifetimeReferredUsd >= tiers[i].unlockThresholdUsd) {
      return tiers[i]
    }
  }
  return tiers[0] // Default to Supporter
}

// Helper to check if monthly cap reached
export function isMonthlyCapReached(
  actionId: string,
  currentMonthPoints: number
): boolean {
  const action = REWARD_ACTIONS.find(a => a.id === actionId)
  if (!action || !action.monthlyCapPoints) return false
  return currentMonthPoints >= action.monthlyCapPoints
}

// Helper to apply diminishing returns
export function applyDiminishingReturns(
  actionId: string,
  actionCount: number,
  basePoints: number
): number {
  const action = REWARD_ACTIONS.find(a => a.id === actionId)
  if (!action || !action.diminishingAfter) return basePoints

  if (actionCount > action.diminishingAfter) {
    return Math.floor(basePoints * REWARD_ENGINE_CONFIG.earningLimits.engagementDiminishingMultiplier)
  }
  return basePoints
}
