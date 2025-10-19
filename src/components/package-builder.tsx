'use client'

import { useState } from 'react'
import { X, Package, Plus, Trash2 } from 'lucide-react'
import { Meal } from '@/types'
import { useAppStore, calculatePackageDiscount } from '@/lib/store'
import { mockMeals } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import QuantitySelector from './quantity-selector'

interface PackageBuilderProps {
  isOpen: boolean
  onClose: () => void
}

export default function PackageBuilder({ isOpen, onClose }: PackageBuilderProps) {
  const { cartItems, addToCart, selectedMealsForPackage, setSelectedMealsForPackage } = useAppStore()
  const [packageName, setPackageName] = useState('')
  const [selectedMeals, setSelectedMeals] = useState<{ [mealId: string]: number }>({})
  
  if (!isOpen) return null

  const availableMeals = mockMeals.filter(meal => 
    cartItems.some(item => item.id === meal.id && item.quantity > 0)
  )

  const totalMeals = Object.values(selectedMeals).reduce((sum, qty) => sum + qty, 0)
  const discountInfo = calculatePackageDiscount(Object.keys(selectedMeals), mockMeals)

  const handleMealQuantityChange = (mealId: string, quantity: number) => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealId]: quantity
    }))
  }

  const handleCreatePackage = () => {
    if (totalMeals < 5) return

    const packageItem = {
      id: `custom-pkg-${Date.now()}`,
      name: packageName || 'Custom Package',
      description: `Custom package with ${totalMeals} meals`,
      price: discountInfo.packagePrice,
      quantity: 1,
      image: availableMeals[0]?.image || '',
      type: 'package' as const,
      mealIds: Object.keys(selectedMeals),
      mealCount: totalMeals
    }

    addToCart(packageItem)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6 text-sage" />
            <h2 className="text-xl font-bold text-charcoal">Build Your Own Package</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left side - Package details */}
          <div className="lg:w-1/3 p-6 bg-cream border-r border-gray-200">
            <div className="space-y-4">
              {/* Package name */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Package Name
                </label>
                <input
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="My Custom Package"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage"
                />
              </div>

              {/* Package summary */}
              <div className="bg-white rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-charcoal">Package Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total meals:</span>
                    <span className="font-medium">{totalMeals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Individual total:</span>
                    <span>{formatPrice(discountInfo.individualTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Package price:</span>
                    <span className="font-semibold text-sage">
                      {formatPrice(discountInfo.packagePrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>You save:</span>
                    <span className="font-semibold">
                      {formatPrice(discountInfo.savings)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Create package button */}
              <button
                onClick={handleCreatePackage}
                disabled={totalMeals < 5}
                className={`
                  w-full py-3 rounded-lg font-semibold transition-colors
                  ${totalMeals >= 5 
                    ? 'bg-sage text-white hover:bg-sage/80' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {totalMeals < 5 
                  ? `Add ${5 - totalMeals} more meals to create package`
                  : 'Create Package'
                }
              </button>
            </div>
          </div>

          {/* Right side - Meal selection */}
          <div className="lg:w-2/3 p-6 max-h-[60vh] overflow-y-auto">
            <h3 className="font-semibold text-charcoal mb-4">
              Select Meals from Your Cart ({availableMeals.length} available)
            </h3>
            
            {availableMeals.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Add meals to your cart first to create a package</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {availableMeals.map(meal => {
                  const cartItem = cartItems.find(item => item.id === meal.id)
                  const maxQuantity = cartItem?.quantity || 0
                  
                  return (
                    <div key={meal.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-charcoal">{meal.name}</h4>
                        <p className="text-sm text-gray-600">{meal.description}</p>
                        <p className="text-sm font-semibold text-sage">
                          {formatPrice(meal.price)} each
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {maxQuantity} in cart
                      </div>
                      <QuantitySelector
                        quantity={selectedMeals[meal.id] || 0}
                        onQuantityChange={(qty) => handleMealQuantityChange(meal.id, qty)}
                        max={maxQuantity}
                        className="w-auto"
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

