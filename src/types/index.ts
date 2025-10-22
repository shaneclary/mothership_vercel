export interface Meal {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  image: string
  category: 'broth' | 'soup' | 'full-meal'
  ingredients: string[]
  benefits: string[]
  nutritionInfo: {
    calories: number
    protein: string
    carbs: string
    fat: string
    fiber: string
  }
  tags: string[]
  isPopular?: boolean
  isNew?: boolean
}

export interface MealPackage {
  id: string
  name: string
  description: string
  longDescription: string
  meals: string[]
  price: number
  originalPrice: number
  image: string
  duration: string
  mealCount: number
  benefits: string[]
  tags: string[]
  isPopular?: boolean
  customizable?: boolean
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  description: string
  type: 'meal' | 'package' | 'subscription'
  mealIds?: string[] // for packages
  mealCount?: number // for packages
  subscriptionTier?: 'basic' | 'premium' | 'vip' // for subscriptions
  isRecurring?: boolean // for subscriptions
}

export interface Testimonial {
  id: string
  name: string
  quote: string
  title?: string
  image?: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  phoneValidated?: boolean
  phoneValidatedAt?: string
  phoneValidationRewardClaimed?: boolean
  createdAt: string
  lastLoginAt: string
}

export interface PhoneValidation {
  id: string
  userId: string
  phoneNumber: string
  verificationCode: string
  isValidated: boolean
  validatedAt?: string
  rewardClaimed: boolean
  rewardClaimedAt?: string
  rewardAmount: number
  createdAt: string
  expiresAt: string
}

export interface MembershipStats {
  memberSince: string
  totalOrders: number
  totalSpent: number
  totalSavings: number
  favoriteCategory: string
  streakDays: number
}

export interface Subscription {
  id: string
  status: 'active' | 'paused' | 'cancelled'
  tier: 'basic' | 'premium' | 'vip'
  mealPlanSize: 'small' | 'medium' | 'large'
  selectionType: 'chef-choice' | 'custom' | 'keep-previous'
  price: number
  nextDeliveryDate: string
  createdAt: string
  totalSavings: number
  deliveryFrequency: 'weekly' | 'bi-weekly' | 'monthly'
  customMealIds?: string[]
  previousMealSelections?: {
    mealIds: string[]
    selectedAt: string
    deliveryDate: string
  }[]
  lastSelectionDate?: string
}

export interface DigitalResource {
  id: string
  title: string
  description: string
  category: string
  type: 'pdf' | 'audio' | 'video'
  fileUrl: string
  thumbnailUrl: string
  fileSize?: string
  duration?: number
  isDownloadable: boolean
  isCompleted: boolean
  progress: number
}

export interface Event {
  id: string
  title: string
  description: string
  type: 'workshop' | 'class' | 'webinar'
  date: string
  location?: string
  isVirtual: boolean
  capacity: number
  registeredCount: number
  memberPrice: number
  regularPrice: number
  status: 'upcoming' | 'live' | 'completed'
  tags: string[]
  instructorName: string
  imageUrl: string
}

export interface Perk {
  id: string
  title: string
  description: string
  type: 'discount' | 'bonus' | 'access'
  value: string
  status: 'active' | 'redeemed' | 'expired'
  partnerName?: string
  promoCode?: string
  expiryDate?: string
  imageUrl: string
}

export interface ReferralProgram {
  totalReferrals: number
  successfulReferrals: number
  pendingReferrals: number
  totalCreditsEarned: number
  availableCredits: number
  referralCode: string
  bonusPerReferral: number
}

