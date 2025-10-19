// Mothership Rewards System - Points Configuration

export const POINTS_CONFIG = {
  // Self-Care & Nourishment
  ORDER_PER_DOLLAR: 1,
  FIRST_ORDER_BONUS: 200,
  COMPLETE_PROFILE: 100,
  TRACK_RECOVERY_WEEKLY: 50,
  TRY_NEW_MEAL: 25,
  GOLDEN_HOUR_MULTIPLIER: 2, // 2-4am orders
  RECURRING_SUBSCRIPTION: 500,
  MONTHLY_LOYALTY: 100, // 3+ months

  // Community Connection
  REFERRAL_COMPLETE: 500,
  WELCOME_NEW_MAMA: 25,
  SHARE_STORY: 100,
  POST_MEAL_PHOTO: 50,
  RECIPE_REVIEW: 25,
  REPLY_TO_POST: 15,
  HOST_MEETUP: 200,
  ATTEND_EVENT: 150,
  REACT_TO_POST: 5,
  MAX_REACTIONS_PER_DAY: 50,
  SHARE_RECOVERY_TIP: 75,
  MENTOR_MONTHLY: 300,
  CELEBRATE_MILESTONE: 20,

  // Learning & Growth
  COMPLETE_MODULE: 75,
  WATCH_WORKSHOP: 50,
  TAKE_QUIZ: 100,
  READ_NEWSLETTER: 10,
  SHARE_ARTICLE: 30,
  ASK_EXPERT: 25,
  SUBMIT_FEEDBACK: 50,

  // Advocacy
  SOCIAL_SHARE: 50,
  GOOGLE_REVIEW: 150,
  INSTAGRAM_STORY: 40,
  USER_CONTENT_FEATURED: 300,
  WORKPLACE_REFERRAL: 1000,
  PRESS_MENTION: 2000,

  // Milestones
  BABY_1_MONTH: 100,
  POSTPARTUM_40_DAYS: 200,
  MOTHERHOOD_ANNIVERSARY: 500,
  SECOND_BABY_BONUS: 250,
  BREASTFEEDING_MILESTONE: 150,
}

// Botanical level progression metaphors - a living garden of reciprocity
export const REWARD_LEVELS = [
  { level: 1, name: 'Seed', minPoints: 0, emoji: '🌱', multiplier: 1.0, description: 'Every garden begins with a single seed' },
  { level: 2, name: 'Sprout', minPoints: 1000, emoji: '🌿', multiplier: 1.1, description: 'Your roots are taking hold' },
  { level: 3, name: 'Bloom', minPoints: 5000, emoji: '🌸', multiplier: 1.15, description: 'Your care creates beauty' },
  { level: 4, name: 'Grove', minPoints: 10000, emoji: '🌳', multiplier: 1.2, description: 'You nurture community growth' },
  { level: 5, name: 'Garden Keeper', minPoints: 20000, emoji: '🏡', multiplier: 1.25, description: 'A guardian of the Nourishment Circle' },
]

export const BADGES = {
  NIGHT_OWL: {
    code: 'night_owl',
    name: 'Night Owl',
    description: 'Ordered during 2-4am window 5+ times',
    emoji: '🌙',
    requirement: 5,
  },
  COMMUNITY_BUILDER: {
    code: 'community_builder',
    name: 'Community Builder',
    description: '100+ community interactions',
    emoji: '💬',
    requirement: 100,
  },
  PAY_IT_FORWARD: {
    code: 'pay_it_forward',
    name: 'Pay It Forward',
    description: 'Gifted 3+ meals to other mamas',
    emoji: '🎁',
    requirement: 3,
  },
  WISDOM_KEEPER: {
    code: 'wisdom_keeper',
    name: 'Wisdom Keeper',
    description: 'Completed all educational modules',
    emoji: '📚',
    requirement: 'all',
  },
  MENTOR_MAMA: {
    code: 'mentor_mama',
    name: 'Mentor Mama',
    description: 'Welcomed 10+ new members',
    emoji: '🤝',
    requirement: 10,
  },
  FOUNDING_CIRCLE: {
    code: 'founding_circle',
    name: 'Founding Circle',
    description: 'Member since launch',
    emoji: '🌟',
    requirement: 'launch',
  },
  STREAK_MASTER: {
    code: 'streak_master',
    name: 'Streak Master',
    description: '30-day engagement streak',
    emoji: '🔥',
    requirement: 30,
  },
  SELF_CARE_CHAMPION: {
    code: 'self_care_champion',
    name: 'Self-Care Champion',
    description: 'Monthly orders for 6+ months',
    emoji: '💪',
    requirement: 6,
  },
}

export const REWARDS_CATALOG = [
  // Tier 1: Self-Care
  { id: 'discount-5', name: '$5 off next order', points: 500, type: 'discount', value: 5, tier: 1 },
  { id: 'addon-free', name: 'Free add-on item', points: 1000, type: 'product', value: 'addon', tier: 1 },
  { id: 'meal-free', name: 'Free meal', points: 2000, type: 'product', value: 'meal', tier: 1 },
  { id: 'credit-30', name: '$30 credit', points: 3000, type: 'credit', value: 30, tier: 1 },
  { id: 'care-package', name: 'Postpartum care package', points: 5000, type: 'product', value: 'package', tier: 1 },

  // Tier 2: Community Gifts
  { id: 'gift-meal', name: 'Gift a meal to another mama', points: 2500, type: 'gift', value: 'meal', tier: 2 },
  { id: 'sponsor-mama', name: "Sponsor new mama's first order", points: 4000, type: 'gift', value: 'first-order', tier: 2 },
  { id: 'host-gathering', name: 'Host virtual gathering', points: 6000, type: 'experience', value: 'gathering', tier: 2 },

  // Tier 3: Premium Experiences
  { id: 'nutritionist-consult', name: 'Private nutritionist consultation', points: 7500, type: 'experience', value: 'consult', tier: 3 },
  { id: 'membership-free', name: '1-month free membership', points: 10000, type: 'membership', value: 1, tier: 3 },
  { id: 'wellness-workshop', name: 'In-person wellness workshop', points: 15000, type: 'experience', value: 'workshop', tier: 3 },
  { id: 'founders-dinner', name: "Founder's dinner with Monika", points: 20000, type: 'experience', value: 'dinner', tier: 3 },

  // Tier 4: Legacy Builder
  { id: 'name-meal', name: 'Name a signature meal', points: 25000, type: 'legacy', value: 'meal-name', tier: 4 },
  { id: 'lifetime-membership', name: 'Lifetime membership', points: 50000, type: 'membership', value: 'lifetime', tier: 4 },
  { id: 'ambassador', name: 'Become Mothership Ambassador', points: 100000, type: 'status', value: 'ambassador', tier: 4 },
]

export type RewardLevel = typeof REWARD_LEVELS[number]
export type Badge = typeof BADGES[keyof typeof BADGES]
export type Reward = typeof REWARDS_CATALOG[number]
