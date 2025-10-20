import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Meal, MealPackage } from '@/types'

// Constants
export const MINIMUM_MEALS = 5

interface AppState {
  // Cart state
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getTotalMeals: () => number
  meetsMinimum: () => boolean
  itemsNeeded: () => number

  // User state
  user: {
    email: string
    name?: string
    firstName?: string
    username?: string // @username for tagging and search
    isSubscribed: boolean
    isMember: boolean
    memberSince?: string
    subscription?: {
      plan?: string
      status?: string
      nextBillingDate?: string
      nextDelivery?: string
      mealPlanSize?: number
      totalSavings?: number
      orders?: number
      dayStreak?: number
    }
  } | null
  setUser: (user: AppState['user']) => void
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  
  // UI state
  selectedFilter: string
  setSelectedFilter: (filter: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  
  // Package builder state
  isPackageBuilderOpen: boolean
  setIsPackageBuilderOpen: (open: boolean) => void
  selectedMealsForPackage: string[]
  setSelectedMealsForPackage: (mealIds: string[]) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Cart state
      cartItems: [],
      
      addToCart: (item) => set((state) => {
        const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id)
        if (existingItem) {
          return {
            cartItems: state.cartItems.map(cartItem =>
              cartItem.id === item.id 
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          }
        }
        return {
          cartItems: [...state.cartItems, { ...item, quantity: 1 }]
        }
      }),
      
      removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== id)
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        cartItems: quantity === 0 
          ? state.cartItems.filter(item => item.id !== id)
          : state.cartItems.map(item =>
              item.id === id ? { ...item, quantity } : item
            )
      })),
      
      clearCart: () => set({ cartItems: [] }),
      
      getCartTotal: () => {
        const { cartItems } = get()
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getTotalMeals: () => {
        const { cartItems } = get()
        return cartItems.reduce((total, item) => {
          if (item.type === 'package') {
            return total + (item.quantity * (item.mealCount || 1))
          }
          return total + item.quantity
        }, 0)
      },

      meetsMinimum: () => {
        const totalMeals = get().getTotalMeals()
        return totalMeals >= MINIMUM_MEALS
      },

      itemsNeeded: () => {
        const totalMeals = get().getTotalMeals()
        return Math.max(0, MINIMUM_MEALS - totalMeals)
      },

      // User state
      user: null,
      setUser: (user) => set({ user }),
      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      
      // UI state
      selectedFilter: 'all',
      setSelectedFilter: (filter) => set({ selectedFilter: filter }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      // Package builder state
      isPackageBuilderOpen: false,
      setIsPackageBuilderOpen: (open) => set({ isPackageBuilderOpen: open }),
      selectedMealsForPackage: [],
      setSelectedMealsForPackage: (mealIds) => set({ selectedMealsForPackage: mealIds }),
    }),
    {
      name: 'mothership-store',
      partialize: (state) => ({
        cartItems: state.cartItems,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Helper functions for cart calculations
export const getDiscountTier = (mealCount: number) => {
  if (mealCount >= 15) return { tier: 15, discount: 0.15, label: '15% off' }
  if (mealCount >= 12) return { tier: 12, discount: 0.10, label: '10% off' }
  if (mealCount >= 8) return { tier: 8, discount: 0.05, label: '5% off' }
  if (mealCount >= 5) return { tier: 5, discount: 0, label: 'Minimum met' }
  return { tier: 0, discount: 0, label: 'Add more meals' }
}

export const calculatePackageDiscount = (mealIds: string[], meals: Meal[]) => {
  const individualTotal = mealIds.reduce((total, id) => {
    const meal = meals.find(m => m.id === id)
    return total + (meal?.price || 0)
  }, 0)
  
  const packagePrice = individualTotal * 0.9 // 10% discount for packages
  const savings = individualTotal - packagePrice
  
  return {
    individualTotal,
    packagePrice,
    savings,
    discountPercentage: 10
  }
}

