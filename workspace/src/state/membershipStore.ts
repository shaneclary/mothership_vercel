import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  User,
  Address,
  PaymentMethod,
  Subscription,
  Shipment,
  DigitalResource,
  Event,
  EventRegistration,
  Perk,
  ReferralProgram,
  NotificationPreferences,
  MembershipStats,
  SubscriptionStatus,
  MealPlanSize,
  MealSelectionType
} from "../types/membership";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface MembershipState extends AuthState {
  // User Profile
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  
  // Subscription Data
  subscription: Subscription | null;
  shipmentHistory: Shipment[];
  upcomingShipments: Shipment[];
  
  // Digital Resources
  digitalResources: DigitalResource[];
  completedResources: string[];
  downloadedResources: string[];
  
  // Events
  availableEvents: Event[];
  eventRegistrations: EventRegistration[];
  
  // Perks & Rewards
  perks: Perk[];
  referralProgram: ReferralProgram | null;
  
  // Settings
  notificationPreferences: NotificationPreferences;
  membershipStats: MembershipStats | null;
  
  // Loading states
  isLoading: boolean;
  
  // Auth Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => void;
  
  // Address Actions
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  
  // Payment Actions
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => void;
  updatePaymentMethod: (id: string, updates: Partial<PaymentMethod>) => void;
  deletePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  
  // Subscription Actions
  updateSubscription: (updates: Partial<Subscription>) => void;
  pauseSubscription: (pauseUntilDate: string) => void;
  resumeSubscription: () => void;
  cancelSubscription: () => void;
  changeMealPlanSize: (size: MealPlanSize) => void;
  changeSelectionType: (type: MealSelectionType) => void;
  setCustomMeals: (mealIds: string[]) => void;
  skipNextDelivery: () => void;
  getPreviousSelection: () => string[] | null;
  hasPreviousSelections: () => boolean;
  
  // Digital Resources Actions
  markResourceCompleted: (resourceId: string, progress?: number) => void;
  downloadResource: (resourceId: string) => void;
  updateResourceProgress: (resourceId: string, progress: number) => void;
  
  // Events Actions
  registerForEvent: (eventId: string) => Promise<boolean>;
  cancelEventRegistration: (eventId: string) => void;
  
  // Perks Actions
  redeemPerk: (perkId: string) => void;
  generateReferralCode: () => void;
  
  // Settings Actions
  updateNotificationPreferences: (preferences: Partial<NotificationPreferences>) => void;
  
  // Data Loading
  loadMembershipData: () => Promise<void>;
  syncWithServer: () => Promise<void>;
}

// Mock data generators
const generateMockUser = (): User => ({
  id: "user_123",
  email: "sarah.johnson@email.com",
  firstName: "Sarah",
  lastName: "Johnson",
  phone: "(555) 123-4567",
  createdAt: "2024-01-15T10:00:00Z",
  lastLoginAt: new Date().toISOString()
});

const generateMockSubscription = (): Subscription => ({
  id: "sub_456",
  status: SubscriptionStatus.ACTIVE,
  tier: "premium" as any,
  mealPlanSize: MealPlanSize.MEDIUM,
  selectionType: MealSelectionType.CHEF_CHOICE,
  price: 159.99,
  nextDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: "2024-01-20T10:00:00Z",
  totalSavings: 247.50,
  deliveryFrequency: "weekly",
  previousMealSelections: [
    {
      mealIds: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      selectedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      deliveryDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      mealIds: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
      selectedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), 
      deliveryDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  lastSelectionDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
});

const generateMockDigitalResources = (): DigitalResource[] => [
  {
    id: "resource_1",
    title: "First 40 Days at Home",
    description: "Complete postpartum recovery guide with nutrition tips and self-care practices",
    category: "postpartum-guides",
    type: "pdf",
    fileUrl: "https://example.com/first-40-days.pdf",
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300",
    fileSize: "2.4 MB",
    isDownloadable: true,
    isCompleted: false,
    progress: 0
  },
  {
    id: "resource_2",
    title: "Gentle Recovery Meditation",
    description: "15-minute guided meditation for postpartum healing and relaxation",
    category: "self-care",
    type: "audio",
    fileUrl: "https://example.com/meditation.mp3",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300",
    duration: 15,
    fileSize: "14.2 MB",
    isDownloadable: true,
    isCompleted: true,
    progress: 100
  },
  {
    id: "resource_3",
    title: "Nutrition for New Mothers",
    description: "Essential nutrients and meal planning strategies for breastfeeding and recovery",
    category: "nutrition",
    type: "pdf",
    fileUrl: "https://example.com/nutrition-guide.pdf",
    thumbnailUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300",
    fileSize: "3.1 MB",
    isDownloadable: true,
    isCompleted: false,
    progress: 65
  }
];

const generateMockEvents = (): Event[] => [
  {
    id: "event_1",
    title: "Postpartum Nutrition Workshop",
    description: "Learn about essential nutrients, meal planning, and healing foods for new mothers",
    type: "workshop",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Downtown Community Center",
    isVirtual: false,
    capacity: 25,
    registeredCount: 18,
    memberPrice: 45.00,
    regularPrice: 65.00,
    status: "upcoming",
    tags: ["nutrition", "postpartum", "workshop"],
    instructorName: "Dr. Emily Chen",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400"
  },
  {
    id: "event_2",
    title: "Virtual Yoga for New Mothers",
    description: "Gentle yoga session designed specifically for postpartum recovery and wellness",
    type: "class",
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    isVirtual: true,
    capacity: 50,
    registeredCount: 32,
    memberPrice: 25.00,
    regularPrice: 35.00,
    status: "upcoming",
    tags: ["yoga", "wellness", "virtual"],
    instructorName: "Lisa Martinez",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
  }
];

const generateMockPerks = (): Perk[] => [
  {
    id: "perk_1",
    title: "Member Meal Discount",
    description: "Enjoy 10% off all individual meals and add-ons",
    type: "discount",
    value: "10%",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300"
  },
  {
    id: "perk_2",
    title: "Prenatal Vitamin Discount",
    description: "20% off premium prenatal vitamins from our partner NutriMama",
    type: "discount",
    value: "20%",
    status: "active",
    partnerName: "NutriMama",
    promoCode: "MOTHERSHIP20",
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300"
  },
  {
    id: "perk_3",
    title: "Free Consultation",
    description: "Complimentary 30-minute nutrition consultation with our registered dietitian",
    type: "bonus",
    value: "Free",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300"
  }
];

const generateMockReferralProgram = (): ReferralProgram => ({
  totalReferrals: 8,
  successfulReferrals: 5,
  pendingReferrals: 3,
  totalCreditsEarned: 125.00,
  availableCredits: 75.00,
  referralCode: "SARAH123",
  bonusPerReferral: 25.00
});

export const useMembershipStore = create<MembershipState>()(
  persist(
    (set, get) => ({
      // Initial Auth State
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      
      // Initial Data State
      addresses: [],
      paymentMethods: [],
      subscription: null,
      shipmentHistory: [],
      upcomingShipments: [],
      digitalResources: [],
      completedResources: [],
      downloadedResources: [],
      availableEvents: [],
      eventRegistrations: [],
      perks: [],
      referralProgram: null,
      notificationPreferences: {
        emailNotifications: true,
        pushNotifications: true,
        orderReminders: true,
        eventUpdates: true,
        promoOffers: true,
        resourceUpdates: true
      },
      membershipStats: null,
      isLoading: false,
      
      // Auth Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          if (email === "sarah.johnson@email.com" && password === "password123") {
            const mockUser = generateMockUser();
            const tokens = {
              accessToken: "mock_access_token_" + Date.now(),
              refreshToken: "mock_refresh_token_" + Date.now()
            };
            
            // Store tokens securely
            await SecureStore.setItemAsync("accessToken", tokens.accessToken);
            await SecureStore.setItemAsync("refreshToken", tokens.refreshToken);
            
            set({
              isAuthenticated: true,
              user: mockUser,
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
              subscription: generateMockSubscription(),
              digitalResources: generateMockDigitalResources(),
              availableEvents: generateMockEvents(),
              perks: generateMockPerks(),
              referralProgram: generateMockReferralProgram(),
              membershipStats: {
                memberSince: "2024-01-20",
                totalOrders: 12,
                totalSpent: 1847.32,
                totalSavings: 247.50,
                favoriteCategory: "comfort-food",
                streakDays: 45
              },
              isLoading: false
            });
            return true;
          }
          
          set({ isLoading: false });
          return false;
        } catch (error) {
          set({ isLoading: false });
          return false;
        }
      },
      
      register: async (userData) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const newUser: User = {
            id: "user_" + Date.now(),
            email: userData.email || "",
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            phone: userData.phone,
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString()
          };
          
          const tokens = {
            accessToken: "mock_access_token_" + Date.now(),
            refreshToken: "mock_refresh_token_" + Date.now()
          };
          
          await SecureStore.setItemAsync("accessToken", tokens.accessToken);
          await SecureStore.setItemAsync("refreshToken", tokens.refreshToken);
          
          set({
            isAuthenticated: true,
            user: newUser,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            digitalResources: generateMockDigitalResources(),
            availableEvents: generateMockEvents(),
            perks: generateMockPerks(),
            referralProgram: {
              totalReferrals: 0,
              successfulReferrals: 0,
              pendingReferrals: 0,
              totalCreditsEarned: 0,
              availableCredits: 0,
              referralCode: "NEW" + Date.now().toString().slice(-4),
              bonusPerReferral: 25.00
            },
            isLoading: false
          });
          return true;
        } catch (error) {
          set({ isLoading: false });
          return false;
        }
      },
      
      logout: async () => {
        try {
          await SecureStore.deleteItemAsync("accessToken");
          await SecureStore.deleteItemAsync("refreshToken");
        } catch (error) {
          console.log("Error clearing secure storage:", error);
        }
        
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          refreshToken: null,
          subscription: null,
          addresses: [],
          paymentMethods: [],
          shipmentHistory: [],
          upcomingShipments: [],
          completedResources: [],
          downloadedResources: [],
          eventRegistrations: [],
          membershipStats: null
        });
      },
      
      refreshAccessToken: async () => {
        try {
          const refreshToken = await SecureStore.getItemAsync("refreshToken");
          if (!refreshToken) return false;
          
          // Simulate refresh API call
          const newAccessToken = "refreshed_token_" + Date.now();
          await SecureStore.setItemAsync("accessToken", newAccessToken);
          
          set({ accessToken: newAccessToken });
          return true;
        } catch (error) {
          return false;
        }
      },
      
      updateProfile: (updates) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
      
      // Address Actions
      addAddress: (address) => {
        const newAddress: Address = {
          ...address,
          id: "addr_" + Date.now()
        };
        set(state => ({ addresses: [...state.addresses, newAddress] }));
      },
      
      updateAddress: (id, updates) => {
        set(state => ({
          addresses: state.addresses.map(addr =>
            addr.id === id ? { ...addr, ...updates } : addr
          )
        }));
      },
      
      deleteAddress: (id) => {
        set(state => ({
          addresses: state.addresses.filter(addr => addr.id !== id)
        }));
      },
      
      setDefaultAddress: (id) => {
        set(state => ({
          addresses: state.addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
          }))
        }));
      },
      
      // Payment Actions
      addPaymentMethod: (method) => {
        const newMethod: PaymentMethod = {
          ...method,
          id: "pm_" + Date.now()
        };
        set(state => ({ paymentMethods: [...state.paymentMethods, newMethod] }));
      },
      
      updatePaymentMethod: (id, updates) => {
        set(state => ({
          paymentMethods: state.paymentMethods.map(method =>
            method.id === id ? { ...method, ...updates } : method
          )
        }));
      },
      
      deletePaymentMethod: (id) => {
        set(state => ({
          paymentMethods: state.paymentMethods.filter(method => method.id !== id)
        }));
      },
      
      setDefaultPaymentMethod: (id) => {
        set(state => ({
          paymentMethods: state.paymentMethods.map(method => ({
            ...method,
            isDefault: method.id === id
          }))
        }));
      },
      
      // Subscription Actions
      updateSubscription: (updates) => {
        const { subscription } = get();
        if (subscription) {
          set({ subscription: { ...subscription, ...updates } });
        }
      },
      
      pauseSubscription: (pauseUntilDate) => {
        const { subscription } = get();
        if (subscription) {
          set({
            subscription: {
              ...subscription,
              status: SubscriptionStatus.PAUSED,
              pausedUntil: pauseUntilDate
            }
          });
        }
      },
      
      resumeSubscription: () => {
        const { subscription } = get();
        if (subscription) {
          set({
            subscription: {
              ...subscription,
              status: SubscriptionStatus.ACTIVE,
              pausedUntil: undefined
            }
          });
        }
      },
      
      cancelSubscription: () => {
        const { subscription } = get();
        if (subscription) {
          set({
            subscription: {
              ...subscription,
              status: SubscriptionStatus.CANCELLED
            }
          });
        }
      },
      
      changeMealPlanSize: (size) => {
        const { subscription } = get();
        if (subscription) {
          const priceMap = {
            [MealPlanSize.SMALL]: 119.99,
            [MealPlanSize.MEDIUM]: 159.99,
            [MealPlanSize.LARGE]: 199.99
          };
          
          set({
            subscription: {
              ...subscription,
              mealPlanSize: size,
              price: priceMap[size]
            }
          });
        }
      },
      
      changeSelectionType: (type) => {
        const { subscription } = get();
        if (subscription) {
          let customMealIds = subscription.customMealIds;
          
          if (type === MealSelectionType.CHEF_CHOICE) {
            customMealIds = undefined;
          } else if (type === MealSelectionType.CUSTOM) {
            customMealIds = customMealIds || [];
          } else if (type === MealSelectionType.KEEP_PREVIOUS) {
            // Get the most recent previous selection
            const previousSelection = subscription.previousMealSelections?.[0];
            customMealIds = previousSelection?.mealIds || [];
          }
          
          set({
            subscription: {
              ...subscription,
              selectionType: type,
              customMealIds
            }
          });
        }
      },
      
      setCustomMeals: (mealIds) => {
        const { subscription } = get();
        if (subscription) {
          // Store current selection in previous selections when setting new custom meals
          const previousSelections = subscription.previousMealSelections || [];
          const newSelection = {
            mealIds: mealIds,
            selectedAt: new Date().toISOString(),
            deliveryDate: subscription.nextDeliveryDate
          };
          
          // Keep only the last 5 selections
          const updatedPreviousSelections = [newSelection, ...previousSelections.slice(0, 4)];
          
          set({
            subscription: {
              ...subscription,
              customMealIds: mealIds,
              previousMealSelections: updatedPreviousSelections,
              lastSelectionDate: new Date().toISOString()
            }
          });
        }
      },
      
      skipNextDelivery: () => {
        const { subscription } = get();
        if (subscription) {
          const currentDate = new Date(subscription.nextDeliveryDate);
          const nextDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
          
          set({
            subscription: {
              ...subscription,
              nextDeliveryDate: nextDate.toISOString()
            }
          });
        }
      },
      
      // Digital Resources Actions
      markResourceCompleted: (resourceId, progress = 100) => {
        set(state => ({
          completedResources: progress === 100 
            ? [...state.completedResources.filter(id => id !== resourceId), resourceId]
            : state.completedResources,
          digitalResources: state.digitalResources.map(resource =>
            resource.id === resourceId
              ? { ...resource, isCompleted: progress === 100, progress }
              : resource
          )
        }));
      },
      
      downloadResource: (resourceId) => {
        set(state => ({
          downloadedResources: [...state.downloadedResources.filter(id => id !== resourceId), resourceId]
        }));
      },
      
      updateResourceProgress: (resourceId, progress) => {
        set(state => ({
          digitalResources: state.digitalResources.map(resource =>
            resource.id === resourceId
              ? { ...resource, progress, isCompleted: progress === 100 }
              : resource
          )
        }));
      },
      
      // Events Actions
      registerForEvent: async (eventId) => {
        try {
          const { user, availableEvents } = get();
          if (!user) return false;
          
          const event = availableEvents.find(e => e.id === eventId);
          if (!event || event.registeredCount >= event.capacity) return false;
          
          const registration: EventRegistration = {
            id: "reg_" + Date.now(),
            eventId,
            userId: user.id,
            status: "registered",
            registeredAt: new Date().toISOString(),
            pricePaid: event.memberPrice
          };
          
          set(state => ({
            eventRegistrations: [...state.eventRegistrations, registration],
            availableEvents: state.availableEvents.map(e =>
              e.id === eventId
                ? { ...e, registeredCount: e.registeredCount + 1 }
                : e
            )
          }));
          
          return true;
        } catch (error) {
          return false;
        }
      },
      
      cancelEventRegistration: (eventId) => {
        set(state => ({
          eventRegistrations: state.eventRegistrations.map(reg =>
            reg.eventId === eventId
              ? { ...reg, status: "cancelled" }
              : reg
          ),
          availableEvents: state.availableEvents.map(e =>
            e.id === eventId
              ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) }
              : e
          )
        }));
      },
      
      // Perks Actions
      redeemPerk: (perkId) => {
        set(state => ({
          perks: state.perks.map(perk =>
            perk.id === perkId
              ? { ...perk, status: "redeemed" }
              : perk
          )
        }));
      },
      
      generateReferralCode: () => {
        const { user } = get();
        if (user) {
          const code = (user.firstName.toUpperCase() + Date.now().toString().slice(-3));
          set(state => ({
            referralProgram: state.referralProgram
              ? { ...state.referralProgram, referralCode: code }
              : null
          }));
        }
      },
      
      // Settings Actions
      updateNotificationPreferences: (preferences) => {
        set(state => ({
          notificationPreferences: { ...state.notificationPreferences, ...preferences }
        }));
      },
      
      // Helper Functions
      getPreviousSelection: () => {
        const { subscription } = get();
        if (!subscription?.previousMealSelections?.length) return null;
        return subscription.previousMealSelections[0].mealIds;
      },
      
      hasPreviousSelections: () => {
        const { subscription } = get();
        return Boolean(subscription?.previousMealSelections?.length);
      },
      
      // Data Loading
      loadMembershipData: async () => {
        set({ isLoading: true });
        try {
          // Check for stored tokens
          const accessToken = await SecureStore.getItemAsync("accessToken");
          if (accessToken) {
            set({ accessToken, isAuthenticated: true });
          }
          
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
        }
      },
      
      syncWithServer: async () => {
        // Simulate server sync
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }),
    {
      name: "mothership-membership-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        addresses: state.addresses,
        subscription: state.subscription,
        completedResources: state.completedResources,
        downloadedResources: state.downloadedResources,
        eventRegistrations: state.eventRegistrations,
        notificationPreferences: state.notificationPreferences,
        membershipStats: state.membershipStats
      }),
    }
  )
);