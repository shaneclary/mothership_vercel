'use client';
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const MINIMUM_MEALS = 5;

  const addToCart = (meal, quantity = 1) => {
    setCart(current => {
      const existingItem = current.find(item => item.id === meal.id);
      if (existingItem) {
        return current.map(item =>
          item.id === meal.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { ...meal, quantity }];
    });
  };

  const updateQuantity = (mealId, quantity) => {
    if (quantity === 0) {
      removeFromCart(mealId);
      return;
    }
    setCart(current =>
      current.map(item =>
        item.id === mealId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (mealId) => {
    setCart(current => current.filter(item => item.id !== mealId));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const meetsMinimum = totalItems >= MINIMUM_MEALS;
  const itemsNeeded = Math.max(0, MINIMUM_MEALS - totalItems);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
      meetsMinimum,
      itemsNeeded,
      MINIMUM_MEALS
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
