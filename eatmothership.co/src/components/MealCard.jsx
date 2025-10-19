'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function MealCard({ meal }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.find(item => item.id === meal.id);
  const quantity = cartItem?.quantity || 0;

  const handleIncrement = () => {
    if (quantity === 0) {
      addToCart(meal, 1);
    } else {
      updateQuantity(meal.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    updateQuantity(meal.id, quantity - 1);
  };

  const handleAdd = () => {
    addToCart(meal, 1);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
      <div className="relative h-48 w-full bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-charcoal mb-2">{meal.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{meal.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {meal.tags?.map(tag => (
            <span key={tag} className="px-3 py-1 bg-sage-green bg-opacity-10 text-sage-green text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between text-xs text-gray-500 mb-4 pb-4 border-b">
          <span>{meal.calories} cal</span>
          <span>{meal.protein}g protein</span>
          <span>{meal.carbs}g carbs</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-sage-green">${meal.price}</span>
            {meal.category && (
              <span className="ml-2 text-xs text-gray-500">{meal.category}</span>
            )}
          </div>

          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="bg-sage-green text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold hover:bg-opacity-90 transition"
            >
              +
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrement}
                className="bg-gray-200 text-charcoal w-10 h-10 rounded-full flex items-center justify-center font-bold hover:bg-gray-300 transition"
              >
                −
              </button>
              <span className="font-bold text-charcoal w-8 text-center">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="bg-sage-green text-white w-10 h-10 rounded-full flex items-center justify-center font-bold hover:bg-opacity-90 transition"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
