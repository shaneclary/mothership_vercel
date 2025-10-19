'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, Sparkles } from 'lucide-react'
import { Meal } from '@/types'
import { useAppStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import QuantitySelector from './quantity-selector'

interface MealCardProps {
  meal: Meal
  showQuantitySelector?: boolean
  quantity?: number
  onQuantityChange?: (quantity: number) => void
}

export default function MealCard({
  meal,
  showQuantitySelector = true,
  quantity: externalQuantity,
  onQuantityChange: externalOnQuantityChange
}: MealCardProps) {
  const { cartItems, addToCart, updateQuantity } = useAppStore()

  // Use external quantity/onChange if provided, otherwise use cart state
  const cartItem = cartItems.find(item => item.id === meal.id)
  const quantity = externalQuantity !== undefined ? externalQuantity : (cartItem?.quantity || 0)

  const handleQuantityChange = (newQuantity: number) => {
    if (externalOnQuantityChange) {
      externalOnQuantityChange(newQuantity)
    } else {
      // If going from 0 to 1, add to cart
      if (quantity === 0 && newQuantity === 1) {
        addToCart({
          id: meal.id,
          name: meal.name,
          price: meal.price,
          image: meal.image,
          description: meal.description,
          type: 'meal'
        })
      } else {
        // Otherwise update quantity
        updateQuantity(meal.id, newQuantity)
      }
    }
  }

  return (
    <div className="group h-full backdrop-blur-xl bg-white/90 rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <Link href={`/meals/${meal.id}`}>
        <div className="relative overflow-hidden">
          <Image
            src={meal.image}
            alt={meal.name}
            width={400}
            height={300}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Popular Badge */}
          {meal.isPopular && (
            <div className="absolute top-4 left-4 backdrop-blur-xl bg-gradient-to-r from-terracotta to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-xl animate-fade-in-scale">
              <Star className="w-4 h-4 mr-1 fill-current" />
              Popular
            </div>
          )}

          {/* New Badge */}
          {meal.isNew && (
            <div className="absolute top-4 right-4 backdrop-blur-xl bg-gradient-to-r from-sage-green to-sage-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              New
            </div>
          )}

          {/* Favorite Button */}
          <button className="absolute top-4 right-4 p-3 backdrop-blur-2xl bg-white/90 rounded-full hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl z-10">
            <Heart className="w-5 h-5 text-charcoal hover:text-terracotta hover:fill-current transition-all" />
          </button>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 backdrop-blur-xl bg-white/90 rounded-full px-4 py-2 text-sm font-semibold text-sage-green shadow-lg capitalize opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
            {meal.category}
          </div>
        </div>
      </Link>

      <div className="p-6 space-y-4">
        <Link href={`/meals/${meal.id}`}>
          <h3 className="font-bold text-xl text-charcoal group-hover:text-sage-green transition-colors line-clamp-2">
            {meal.name}
          </h3>
        </Link>

        <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed">
          {meal.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {meal.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="px-3 py-1.5 backdrop-blur-xl bg-sage-green/10 text-sage-green text-xs rounded-full font-semibold border border-sage-green/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price and Quantity Selector */}
        <div className="pt-4 border-t border-gray-100 space-y-3">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Price</p>
            <span className="text-3xl font-bold bg-gradient-to-r from-sage-green to-sage-700 bg-clip-text text-transparent">
              {formatPrice(meal.price)}
            </span>
          </div>

          {showQuantitySelector && (
            <div className="flex justify-center">
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
              />
            </div>
          )}
        </div>

        {/* Nutrition Info */}
        <div className="pt-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="backdrop-blur-xl bg-sage-green/5 rounded-xl p-2">
              <p className="text-lg font-bold text-sage-green">{meal.nutritionInfo.calories}</p>
              <p className="text-xs text-gray-500 uppercase">cal</p>
            </div>
            <div className="backdrop-blur-xl bg-sage-green/5 rounded-xl p-2">
              <p className="text-lg font-bold text-sage-green">{meal.nutritionInfo.protein}</p>
              <p className="text-xs text-gray-500 uppercase">protein</p>
            </div>
            <div className="backdrop-blur-xl bg-sage-green/5 rounded-xl p-2">
              <p className="text-lg font-bold text-sage-green">{meal.nutritionInfo.carbs}</p>
              <p className="text-xs text-gray-500 uppercase">carbs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
