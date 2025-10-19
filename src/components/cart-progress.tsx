'use client'

import { useAppStore, MINIMUM_MEALS } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

export default function CartProgress() {
  const getTotalMeals = useAppStore((state) => state.getTotalMeals)
  const getCartTotal = useAppStore((state) => state.getCartTotal)
  const itemsNeeded = useAppStore((state) => state.itemsNeeded)

  const totalItems = getTotalMeals()
  const totalPrice = getCartTotal()
  const needed = itemsNeeded()
  const progress = Math.min(100, (totalItems / MINIMUM_MEALS) * 100)

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-charcoal text-lg">
              {needed > 0
                ? `${needed} more meal${needed !== 1 ? 's' : ''} needed`
                : '✓ Minimum met!'
              }
            </h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {MINIMUM_MEALS} meals minimum for free shipping
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-sage-green">
            {formatPrice(totalPrice)}
          </div>
          <div className="text-sm text-gray-600">
            {totalItems}/{MINIMUM_MEALS} meals selected
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-sage-green h-full transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
