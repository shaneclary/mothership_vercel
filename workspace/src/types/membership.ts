export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export enum MembershipTier {
  BASIC = "basic",
  PREMIUM = "premium",
  PLATINUM = "platinum"
}

export enum SubscriptionStatus {
  ACTIVE = "active",
  PAUSED = "paused",
  CANCELLED = "cancelled",
  PENDING = "pending"
}

export enum MealPlanSize {
  SMALL = 8,
  MEDIUM = 12,
  LARGE = 16
}

export enum MealSelectionType {
  CHEF_CHOICE = "chef_choice",
  CUSTOM = "custom",
  KEEP_PREVIOUS = "keep_previous"
}

export interface Subscription {
  id: string;
  status: SubscriptionStatus;
  tier: MembershipTier;
  mealPlanSize: MealPlanSize;
  selectionType: MealSelectionType;
  price: number;
  nextDeliveryDate: string;
  pausedUntil?: string;
  createdAt: string;
  totalSavings: number;
  deliveryFrequency: "weekly" | "biweekly" | "monthly";
  customMealIds?: string[];
  previousMealSelections?: Array<{
    mealIds: string[];
    selectedAt: string;
    deliveryDate: string;
  }>;
  lastSelectionDate?: string;
}

export interface Shipment {
  id: string;
  subscriptionId: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  deliveryDate: string;
  trackingNumber?: string;
  mealIds: string[];
  totalAmount: number;
  createdAt: string;
}

export interface DigitalResource {
  id: string;
  title: string;
  description: string;
  category: "nutrition" | "recovery" | "self-care" | "postpartum-guides";
  type: "pdf" | "audio" | "video";
  fileUrl: string;
  thumbnailUrl?: string;
  duration?: number; // in minutes for audio/video
  fileSize?: string;
  isDownloadable: boolean;
  isCompleted?: boolean;
  progress?: number; // 0-100 for audio/video progress
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: "class" | "workshop" | "webinar";
  date: string;
  endDate?: string;
  location?: string;
  isVirtual: boolean;
  capacity: number;
  registeredCount: number;
  memberPrice: number;
  regularPrice: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  tags: string[];
  instructorName?: string;
  imageUrl?: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  status: "registered" | "waitlisted" | "cancelled";
  registeredAt: string;
  pricePaid: number;
}

export interface Perk {
  id: string;
  title: string;
  description: string;
  type: "discount" | "bonus" | "access" | "referral";
  value?: string; // e.g., "10%", "$25", "Early Access"
  status: "active" | "expired" | "redeemed";
  expiryDate?: string;
  termsUrl?: string;
  imageUrl?: string;
  partnerName?: string;
  promoCode?: string;
}

export interface ReferralProgram {
  totalReferrals: number;
  successfulReferrals: number;
  pendingReferrals: number;
  totalCreditsEarned: number;
  availableCredits: number;
  referralCode: string;
  bonusPerReferral: number;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  orderReminders: boolean;
  eventUpdates: boolean;
  promoOffers: boolean;
  resourceUpdates: boolean;
}

export interface MembershipStats {
  memberSince: string;
  totalOrders: number;
  totalSpent: number;
  totalSavings: number;
  favoriteCategory: string;
  streakDays: number;
}