// Utility functions for cart calculations and meal counting

interface CartItem {
  id: string;
  quantity: number;
}

interface PackageCartItem {
  id: string;
  quantity: number;
  mealCount: number;
  mealQuantities?: Record<string, number>;
}

interface AppState {
  cartItems: CartItem[];
  packageItems: PackageCartItem[];
}

// Calculate total meal units across individual meals and packages
export function getTotalMeals(cartItems: CartItem[], packageItems: PackageCartItem[]): number {
  // Ensure we have valid arrays
  const validCartItems = Array.isArray(cartItems) ? cartItems : [];
  const validPackageItems = Array.isArray(packageItems) ? packageItems : [];

  // Count individual meal items (each cart item quantity = number of meals)
  const individualMeals = validCartItems.reduce((total, item) => {
    if (!item || typeof item.quantity !== 'number') return total;
    return total + Math.max(0, item.quantity);
  }, 0);

  // Count meals from packages
  const packageMeals = validPackageItems.reduce((total, pkg) => {
    if (!pkg || typeof pkg.quantity !== 'number') return total;
    
    const pkgQuantity = Math.max(0, pkg.quantity);
    let mealsPerPackage = 0;

    // Use mealCount if available (preset packages)
    if (typeof pkg.mealCount === 'number' && pkg.mealCount > 0) {
      mealsPerPackage = pkg.mealCount;
    } 
    // Fallback to summing mealQuantities (custom packages)
    else if (pkg.mealQuantities && typeof pkg.mealQuantities === 'object') {
      mealsPerPackage = Object.values(pkg.mealQuantities).reduce((sum, qty) => {
        return sum + (typeof qty === 'number' && qty > 0 ? qty : 0);
      }, 0);
    }

    return total + (mealsPerPackage * pkgQuantity);
  }, 0);

  return individualMeals + packageMeals;
}

// Zustand selector function for getting total meals
export const selectTotalMeals = (state: AppState): number => {
  return getTotalMeals(state.cartItems, state.packageItems);
};