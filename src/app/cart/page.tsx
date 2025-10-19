'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, ShoppingBag, ArrowLeft, Minus, Plus } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ProgressIndicator from '@/components/progress-indicator'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getTotalMeals } = useAppStore()
  const [isClearing, setIsClearing] = useState(false)

  const total = getCartTotal()
  const shipping = 0 // Free shipping
  const tax = total * 0.08 // 8% tax
  const finalTotal = total + shipping + tax
  const totalMeals = getTotalMeals()
  const needsMore = Math.max(0, 5 - totalMeals)

  const handleClearCart = () => {
    setIsClearing(true)
    clearCart()
    setTimeout(() => setIsClearing(false), 1000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h1 className="font-cedarville text-3xl text-charcoal mb-4">
              Your cart is empty
            </h1>
            <p className="text-lg text-charcoal/60 mb-8">
              Add some nourishing meals to get started on your postpartum journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/meals"
                className="bg-sage hover:bg-sage/80 px-8 py-4 rounded-full text-white font-semibold text-lg transition-colors"
              >
                Shop Meals
              </Link>
              <Link
                href="/packages"
                className="bg-dusty-rose hover:bg-dusty-rose/80 px-8 py-4 rounded-full text-white font-semibold text-lg transition-colors"
              >
                Shop Packages
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/meals"
            className="flex items-center text-charcoal hover:text-sage transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
          
          <button
            onClick={handleClearCart}
            className="text-terracotta hover:text-terracotta/80 font-medium transition-colors"
            disabled={isClearing}
          >
            {isClearing ? 'Clearing...' : 'Clear All'}
          </button>
        </div>

        <h1 className="font-cedarville text-3xl text-charcoal mb-8">
          Your Order ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </h1>

        {/* Progress Indicator */}
        <ProgressIndicator />

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-charcoal mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {item.description}
                  </p>
                  {item.type === 'package' && item.mealCount && (
                    <p className="text-sm text-sage font-medium">
                      {item.mealCount} meals included
                    </p>
                  )}
                  {item.type === 'subscription' && item.isRecurring && (
                    <p className="text-sm text-terracotta font-medium">
                      Recurring monthly subscription
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  {/* Quantity Controls - Hide for subscriptions */}
                  {item.type !== 'subscription' && (
                    <div className="flex items-center border border-sage/30 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2 text-charcoal hover:bg-sage/10 hover:text-sage transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="px-3 py-2 font-medium text-sm border-x border-sage/30 min-w-[3rem] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-charcoal hover:bg-sage/10 hover:text-sage transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="text-right">
                    <p className="text-xl font-bold text-sage">
                      {formatPrice(item.price * item.quantity)}
                      {item.type === 'subscription' && <span className="text-sm font-normal text-gray-500">/month</span>}
                    </p>
                    {item.quantity > 1 && item.type !== 'subscription' && (
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.price)} each
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-terracotta transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h2 className="font-semibold text-xl text-charcoal mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-charcoal">Subtotal</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-charcoal">Shipping</span>
              <span className="text-sage font-semibold">Free</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-charcoal">Tax</span>
              <span className="font-semibold">{formatPrice(tax)}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="text-xl font-bold text-charcoal">Total</span>
                <span className="text-xl font-bold text-sage">{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-sage/10 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-charcoal mb-2">Delivery Information</h3>
          <p className="text-charcoal/70 text-sm leading-relaxed">
            Your meals will be delivered frozen in insulated packaging within 3-5 business days. 
            Free shipping on all orders.
          </p>
        </div>

        {/* Checkout Button */}
        {totalMeals < 5 && !cartItems.some(item => item.type === 'subscription') ? (
          <button
            disabled
            className="w-full py-4 rounded-full font-bold text-lg bg-gray-300 text-gray-500 cursor-not-allowed"
          >
            Add {needsMore} more {needsMore === 1 ? 'meal' : 'meals'} to proceed
          </button>
        ) : (
          <Link
            href="/checkout"
            className="block w-full py-4 rounded-full font-bold text-lg bg-sage hover:bg-sage/80 text-white text-center transition-colors"
          >
            Proceed to Checkout - {formatPrice(finalTotal)}
          </Link>
        )}

        {/* Continue Shopping */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link
            href="/meals"
            className="flex-1 bg-white border-2 border-sage py-4 rounded-full text-sage font-semibold text-center hover:bg-sage hover:text-white transition-colors"
          >
            Shop More Meals
          </Link>
          <Link
            href="/packages"
            className="flex-1 bg-white border-2 border-dusty-rose py-4 rounded-full text-dusty-rose font-semibold text-center hover:bg-dusty-rose hover:text-white transition-colors"
          >
            Shop Packages
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

