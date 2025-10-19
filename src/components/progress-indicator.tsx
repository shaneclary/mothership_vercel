'use client'

import { useAppStore, getDiscountTier } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

export default function ProgressIndicator() {
  const { getTotalMeals, getCartTotal } = useAppStore()
  const totalMeals = getTotalMeals()
  const cartTotal = getCartTotal()
  const discountTier = getDiscountTier(totalMeals)

  const needsMore = Math.max(0, 5 - totalMeals)
  const progressPercentage = Math.min(100, (totalMeals / 5) * 100)

  if (totalMeals >= 5) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-semibold text-lg">
              ✓ Minimum order met! Ready to checkout
            </span>
          </div>
          <div className="text-green-700 font-bold text-xl">
            {formatPrice(cartTotal)}
          </div>
        </div>
        
        {discountTier.discount > 0 && (
          <div className="text-sm text-green-600 font-medium">
            🎉 You&apos;re saving {discountTier.label} on your order!
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-sage/5 to-sage/10 border border-sage/20 rounded-2xl p-6 mb-8 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-charcoal font-semibold text-lg">
          {needsMore > 0 ? `${needsMore} more meals needed` : 'Minimum order met!'}
        </span>
        <span className="text-sage font-bold text-xl">
          {formatPrice(cartTotal)}
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-sage/20 rounded-full h-3 mb-4 shadow-inner">
        <div 
          className="bg-gradient-to-r from-sage to-sage-600 h-3 rounded-full transition-all duration-500 shadow-sm"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm text-charcoal/60 font-medium">
        <span>5 meals minimum for free shipping</span>
        <span>{totalMeals}/5 meals selected</span>
      </div>
      
      {/* Next tier info */}
      {totalMeals > 0 && totalMeals < 15 && (
        <div className="mt-4 p-3 bg-white/50 rounded-xl">
          {totalMeals < 8 && (
            <p className="text-charcoal/70 text-sm">
              Add {8 - totalMeals} more meals to get <span className="font-bold text-sage">5% off</span>
            </p>
          )}
          {totalMeals >= 8 && totalMeals < 12 && (
            <p className="text-charcoal/70 text-sm">
              Add {12 - totalMeals} more meals to get <span className="font-bold text-sage">10% off</span>
            </p>
          )}
          {totalMeals >= 12 && totalMeals < 15 && (
            <p className="text-charcoal/70 text-sm">
              Add {15 - totalMeals} more meals to get <span className="font-bold text-sage">15% off</span>
            </p>
          )}
        </div>
      )}
    </div>
  )
}
