import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

interface PackageCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  meals: string[]; // meal IDs included in package (expanded or unique)
  mealCount: number;
  mealQuantities?: Record<string, number>; // per-meal qty breakdown for bundles
  isPackage: true;
}

interface AppState {
  // Cart
  cartItems: CartItem[];
  packageItems: PackageCartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  addPackageToCart: (item: Omit<PackageCartItem, "quantity" | "isPackage">) => void;
  removeFromCart: (id: string) => void;
  removePackageFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updatePackageQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  
  // Email signup
  userEmail: string;
  setUserEmail: (email: string) => void;
  isSubscribed: boolean;
  setSubscribed: (subscribed: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Cart state
      cartItems: [],
      packageItems: [],
      addToCart: (item) => set((state) => {
        const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
          return {
            cartItems: state.cartItems.map(cartItem =>
              cartItem.id === item.id 
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          };
        }
        return {
          cartItems: [...state.cartItems, { ...item, quantity: 1 }]
        };
      }),
      addPackageToCart: (item) => set((state) => {
        const packageItem = { ...item, quantity: 1, isPackage: true as const };
        const existingPackage = state.packageItems.find(pkgItem => pkgItem.id === item.id);
        if (existingPackage) {
          return {
            packageItems: state.packageItems.map(pkgItem =>
              pkgItem.id === item.id 
                ? { ...pkgItem, quantity: pkgItem.quantity + 1 }
                : pkgItem
            )
          };
        }
        return {
          packageItems: [...state.packageItems, packageItem]
        };
      }),
      removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== id)
      })),
      removePackageFromCart: (id) => set((state) => ({
        packageItems: state.packageItems.filter(item => item.id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        cartItems: quantity === 0 
          ? state.cartItems.filter(item => item.id !== id)
          : state.cartItems.map(item =>
              item.id === id ? { ...item, quantity } : item
            )
      })),
      updatePackageQuantity: (id, quantity) => set((state) => ({
        packageItems: quantity === 0 
          ? state.packageItems.filter(item => item.id !== id)
          : state.packageItems.map(item =>
              item.id === id ? { ...item, quantity } : item
            )
      })),
      clearCart: () => set({ cartItems: [], packageItems: [] }),
      getCartTotal: () => {
        const { cartItems, packageItems } = get();
        const mealTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const packageTotal = packageItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        return mealTotal + packageTotal;
      },
      
      // Email state
      userEmail: "",
      setUserEmail: (email) => set({ userEmail: email }),
      isSubscribed: false,
      setSubscribed: (subscribed) => set({ isSubscribed: subscribed }),
    }),
    {
      name: "mothership-app-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        cartItems: state.cartItems,
        packageItems: state.packageItems,
        userEmail: state.userEmail,
        isSubscribed: state.isSubscribed,
      }),
    }
  )
);