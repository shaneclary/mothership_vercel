'use client'

import { useState, useEffect } from 'react'
import ProtectedRoute from '@/components/protected-route'
import PortalNav from '@/components/portal-nav'
import MealCard from '@/components/meal-card'
import { mockMeals, mockMealPackages } from '@/lib/mock-data'
import { Search, Sparkles, Star, Calendar, ShoppingCart, Package, CheckCircle, AlertCircle, Plus, Minus, Mail, Lock, Unlock, ExternalLink, X } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

export default function PortalMealsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [orderMode, setOrderMode] = useState<'subscription' | 'extras'>('subscription')
  const [subscriptionMode, setSubscriptionMode] = useState<'custom' | 'package'>('custom')
  const [packageQuantities, setPackageQuantities] = useState<Record<string, number>>({}) // Multiple packages with quantities
  const [customMealQuantities, setCustomMealQuantities] = useState<Record<string, number>>({})
  const [isMenuLocked, setIsMenuLocked] = useState(true)
  const [showUnlockModal, setShowUnlockModal] = useState(false)
  const [showSaveChangesModal, setShowSaveChangesModal] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [savedSubscriptionState, setSavedSubscriptionState] = useState<Record<string, number>>({})

  // Mock subscription data (will come from database later)
  const currentSubscriptionMeals = [
    { id: '1', name: 'Golden Turmeric Chicken Soup', quantity: 4 },
    { id: '2', name: 'Nourishing Bone Broth', quantity: 6 },
    { id: '3', name: 'Mama\'s Comfort Stew', quantity: 2 },
  ]
  const nextDeliveryDate = new Date('2025-11-15')
  const subscriptionFrequency: 'weekly' | 'monthly' = 'monthly'

  // Initialize cart with subscription items on mount
  useEffect(() => {
    const initialState: Record<string, number> = {}
    currentSubscriptionMeals.forEach(meal => {
      initialState[meal.id] = meal.quantity
    })
    setCustomMealQuantities(initialState)
    setSavedSubscriptionState(initialState)
  }, [])

  // Calculate total meals and pricing
  const getTotalMeals = () => {
    if (subscriptionMode === 'package') {
      return Object.entries(packageQuantities).reduce((sum, [pkgId, qty]) => {
        const pkg = mockMealPackages.find(p => p.id === pkgId)
        return sum + (pkg?.mealCount || 0) * qty
      }, 0)
    }
    return Object.values(customMealQuantities).reduce((sum, qty) => sum + qty, 0)
  }

  const getTotalPackages = () => {
    return Object.values(packageQuantities).reduce((sum, qty) => sum + qty, 0)
  }

  const getBasePrice = () => {
    if (subscriptionMode === 'package') {
      return Object.entries(packageQuantities).reduce((sum, [pkgId, qty]) => {
        const pkg = mockMealPackages.find(p => p.id === pkgId)
        return sum + (pkg?.price || 0) * qty
      }, 0)
    }
    return Object.entries(customMealQuantities).reduce((sum, [mealId, qty]) => {
      const meal = mockMeals.find(m => m.id === mealId)
      return sum + (meal?.price || 0) * qty
    }, 0)
  }

  const getVolumeDiscount = () => {
    const totalMeals = getTotalMeals()
    if (totalMeals >= 100) return 0.22 // Secret 22% discount for 100+ meals
    if (totalMeals >= 13) return 0.15
    if (totalMeals >= 8) return 0.10
    if (totalMeals >= 5) return 0.05
    return 0
  }

  const handlePackageQuantityChange = (pkgId: string, change: number) => {
    setPackageQuantities(prev => {
      const currentQty = prev[pkgId] || 0
      const newQty = Math.max(0, Math.min(20, currentQty + change)) // Max 20 per package

      if (newQty === 0) {
        const newQuantities = { ...prev }
        delete newQuantities[pkgId]
        return newQuantities
      }
      return { ...prev, [pkgId]: newQty }
    })
  }

  const getMemberDiscount = () => 0.10 // 10% member discount

  const calculateFinalPrice = () => {
    const base = getBasePrice()
    const volumeDiscount = getVolumeDiscount()
    const memberDiscount = getMemberDiscount()
    const afterVolume = base * (1 - volumeDiscount)
    const final = afterVolume * (1 - memberDiscount)
    return final
  }

  const handleCustomMealQuantityChange = (mealId: string, quantity: number) => {
    // Check if menu is locked and trying to change subscription items
    if (orderMode === 'subscription' && isMenuLocked) {
      setShowUnlockModal(true)
      return
    }

    setCustomMealQuantities(prev => {
      const newQuantities = { ...prev }
      if (quantity === 0) {
        delete newQuantities[mealId]
      } else {
        newQuantities[mealId] = quantity
      }

      // Track if there are unsaved changes
      if (orderMode === 'subscription') {
        const hasChanges = JSON.stringify(newQuantities) !== JSON.stringify(savedSubscriptionState)
        setHasUnsavedChanges(hasChanges)
      }

      return newQuantities
    })
  }

  const handleLockToggle = () => {
    // If trying to lock, check if there are unsaved changes
    if (!isMenuLocked) {
      const currentState = JSON.stringify(customMealQuantities)
      const savedState = JSON.stringify(savedSubscriptionState)

      console.log('🔍 Lock Toggle Debug:')
      console.log('Current State:', currentState)
      console.log('Saved State:', savedState)
      console.log('Are they different?', currentState !== savedState)

      if (currentState !== savedState) {
        console.log('✅ Showing save modal!')
        setShowSaveChangesModal(true)
        return
      }
    }

    console.log('🔒 Toggling lock state')
    setIsMenuLocked(!isMenuLocked)
  }

  const handleSaveChanges = () => {
    setSavedSubscriptionState(customMealQuantities)
    setHasUnsavedChanges(false)
    setIsMenuLocked(true)
    setShowSaveChangesModal(false)
  }

  const handleDiscardChanges = () => {
    setCustomMealQuantities(savedSubscriptionState)
    setHasUnsavedChanges(false)
    setIsMenuLocked(true)
    setShowSaveChangesModal(false)
  }

  const handleUnlockAndEdit = () => {
    setIsMenuLocked(false)
    setShowUnlockModal(false)
  }

  const filters = [
    { id: "all", label: "All Meals", count: mockMeals.length, icon: "🍽️" },
    { id: "soup", label: "Soups", count: mockMeals.filter(m => m.category === "soup").length, icon: "🍲" },
    { id: "broth", label: "Broths", count: mockMeals.filter(m => m.category === "broth").length, icon: "🥣" },
    { id: "full-meal", label: "Full Meals", count: mockMeals.filter(m => m.category === "full-meal").length, icon: "🍱" },
  ]

  const filteredMeals = mockMeals.filter(meal => {
    const matchesFilter = selectedFilter === "all" || meal.category === selectedFilter
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meal.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen relative overflow-hidden" style={{ backgroundColor: '#F9F6F1' }}>
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sage-green rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blush rounded-full blur-3xl" />
        </div>

        <PortalNav />

        <main className="flex-1 p-8 relative z-10">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="inline-flex items-center backdrop-blur-xl bg-sage-green/10 border border-sage-green/20 px-6 py-3 rounded-full mb-4 shadow-lg">
              <Star className="w-5 h-5 text-sage-green mr-2" />
              <span className="text-sage-green font-semibold text-sm uppercase tracking-wider">Member Exclusive</span>
            </div>
            <h1 className="text-5xl font-bold text-sage-green mb-3 font-cedarville">
              Browse Meals
            </h1>
            <p className="text-gray-600 text-lg">
              {orderMode === 'subscription'
                ? 'Manage your monthly meal preferences'
                : 'Order extra meals for one-time delivery'}
            </p>
          </div>

          {/* Current Subscription Menu */}
          {orderMode === 'subscription' && (
            <div className="mb-8 animate-fade-in-scale">
              <div className="backdrop-blur-xl bg-white/90 rounded-2xl shadow-xl border-2 border-sage-green/30 overflow-hidden">
                {/* Header with Lock/Unlock */}
                <div className="bg-gradient-to-r from-sage-green to-sage-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Your {subscriptionFrequency === 'monthly' ? 'Monthly' : 'Weekly'} Menu</h2>
                        <p className="text-white/90 text-sm">
                          {currentSubscriptionMeals.reduce((sum, meal) => sum + meal.quantity, 0)} meals selected
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLockToggle}
                      className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-white font-semibold transition-all duration-300 border border-white/30"
                    >
                      {isMenuLocked ? (
                        <>
                          <Lock className="w-5 h-5" />
                          <span>Locked</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-5 h-5" />
                          <span>Unlocked</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Next Delivery Info */}
                  <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-white" />
                      <div>
                        <p className="text-white/80 text-xs font-medium">Next Delivery</p>
                        <p className="text-white text-lg font-bold">
                          {nextDeliveryDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <a
                      href="/portal/subscription"
                      className="flex items-center gap-2 px-4 py-2 bg-white text-sage-green rounded-lg font-semibold hover:bg-white/90 transition-colors"
                    >
                      Manage
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-6">
                  {isMenuLocked ? (
                    <>
                      <div className="flex items-center gap-2 mb-4 text-charcoal-70">
                        <Lock className="w-4 h-4" />
                        <p className="text-sm font-medium">Menu is locked. Click the lock button above to make changes.</p>
                      </div>
                      <div className="space-y-3">
                        {currentSubscriptionMeals.map((meal) => (
                          <div
                            key={meal.id}
                            className="flex items-center justify-between p-4 bg-sage-green/5 rounded-xl border border-sage-green/20"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-sage-green/20 flex items-center justify-center">
                                <span className="text-sage-green font-bold">{meal.quantity}</span>
                              </div>
                              <span className="font-medium text-charcoal">{meal.name}</span>
                            </div>
                            <div className="text-sage-green text-sm font-semibold">
                              {formatPrice(mockMeals.find(m => m.id === meal.id)?.price || 0)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-4 text-sage-green">
                        <Unlock className="w-4 h-4" />
                        <p className="text-sm font-medium">Menu is unlocked. Browse meals below to make changes.</p>
                      </div>
                      <div className="bg-sage-green/10 border border-sage-green/30 rounded-xl p-4">
                        <p className="text-sm text-charcoal-70 text-center">
                          Scroll down to browse all available meals and modify your subscription selections.
                          Don't forget to lock your menu when you're done!
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Order Mode Toggle */}
          <div className="mb-8 animate-fade-in-scale">
            <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-2 shadow-lg border border-white/20 inline-flex">
              <button
                onClick={() => setOrderMode('subscription')}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  orderMode === 'subscription'
                    ? 'bg-gradient-to-r from-sage-green to-sage-700 text-white shadow-lg'
                    : 'text-charcoal hover:bg-sage-green/10'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-bold">Manage Subscription</div>
                  <div className="text-xs opacity-90">Set monthly preferences</div>
                </div>
              </button>
              <button
                onClick={() => setOrderMode('extras')}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  orderMode === 'extras'
                    ? 'bg-gradient-to-r from-sage-green to-sage-700 text-white shadow-lg'
                    : 'text-charcoal hover:bg-sage-green/10'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-bold">Order Extras</div>
                  <div className="text-xs opacity-90">One-time purchase</div>
                </div>
              </button>
            </div>
          </div>

          {/* Subscription Mode: Package vs Custom Toggle */}
          {orderMode === 'subscription' && (
            <div className="mb-8 animate-fade-in-scale">
              <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-2 shadow-lg border border-white/20 inline-flex">
                <button
                  onClick={() => setSubscriptionMode('package')}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    subscriptionMode === 'package'
                      ? 'bg-sage-green text-white shadow-md'
                      : 'text-charcoal hover:bg-sage-green/10'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  Select Package
                </button>
                <button
                  onClick={() => setSubscriptionMode('custom')}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    subscriptionMode === 'custom'
                      ? 'bg-sage-green text-white shadow-md'
                      : 'text-charcoal hover:bg-sage-green/10'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Custom Selection
                </button>
              </div>
            </div>
          )}

          {/* Subscription Summary */}
          {orderMode === 'subscription' && (
            <div className="mb-8 backdrop-blur-xl bg-gradient-to-r from-sage-green/10 to-sage-700/10 rounded-2xl p-6 shadow-lg border-2 border-sage-green/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-charcoal">Your Subscription</h3>
                  <p className="text-sm text-gray-600">
                    {getTotalMeals() === 0
                      ? 'No meals selected yet'
                      : getTotalMeals() >= 5
                      ? `${getTotalMeals()} meals selected`
                      : `Select ${5 - getTotalMeals()} more meals (5 minimum)`}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-sage-green">
                    {getTotalMeals() === 0 ? '$0.00' : formatPrice(calculateFinalPrice())}
                  </div>
                  <div className="text-xs text-gray-600">per month</div>
                </div>
              </div>

              {getTotalMeals() === 0 ? (
                <div className="pt-4 border-t border-sage-green/20 text-center">
                  <p className="text-gray-500 text-sm">
                    {subscriptionMode === 'package'
                      ? 'Select package quantities to see your pricing'
                      : 'Start adding meals to see your pricing breakdown'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2 pt-4 border-t border-sage-green/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base Price ({getTotalMeals()} meals)</span>
                    <span className="font-semibold">{formatPrice(getBasePrice())}</span>
                  </div>
                  {getVolumeDiscount() > 0 && (
                    <>
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Volume Discount ({(getVolumeDiscount() * 100).toFixed(0)}%)</span>
                        <span>-{formatPrice(getBasePrice() * getVolumeDiscount())}</span>
                      </div>
                      <div className="flex justify-between text-sm border-t border-sage-green/10 pt-2">
                        <span className="text-gray-600">Subtotal after volume discount</span>
                        <span className="font-semibold">{formatPrice(getBasePrice() * (1 - getVolumeDiscount()))}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Member Discount (10%)</span>
                    <span>-{formatPrice(getBasePrice() * (1 - getVolumeDiscount()) * getMemberDiscount())}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {getTotalMeals() >= 5 && getTotalMeals() < 100 && (
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        ✓ 5+ meals: 5% off
                      </div>
                    )}
                    {getTotalMeals() >= 8 && getTotalMeals() < 100 && (
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        ✓ 8+ meals: 10% off
                      </div>
                    )}
                    {getTotalMeals() >= 13 && getTotalMeals() < 100 && (
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        ✓ 13+ meals: 15% off
                      </div>
                    )}
                    {getTotalMeals() >= 100 && (
                      <div className="px-3 py-1 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 rounded-full text-xs font-semibold border border-amber-300">
                        ✓ 100+ meals: 22% BULK BONUS! 🎉
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Search Bar */}
          <div className="mb-8 animate-fade-in-scale">
            <div className="relative backdrop-blur-xl bg-white/90 rounded-2xl shadow-lg border border-white/20">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={orderMode === 'subscription' ? 'Search meals for your subscription...' : 'Search meals to order now...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green text-lg"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-scale">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-sage-green to-sage-700 text-white'
                    : 'backdrop-blur-xl bg-white/90 text-charcoal hover:bg-white border border-white/20'
                }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.label}
                <span className="ml-2 opacity-75">({filter.count})</span>
              </button>
            ))}
          </div>

          {/* Bulk Ordering Message - Show when total packages >= 20 */}
          {orderMode === 'subscription' && subscriptionMode === 'package' && getTotalPackages() >= 20 && (
            <div className="mb-6 rounded-2xl p-6 border-2 bg-purple-50 border-purple-300 flex items-start gap-4">
              <Mail className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-purple-800 text-lg mb-2">Bulk Order Inquiry</h3>
                <p className="text-purple-700 mb-3">
                  You've reached our maximum online order limit of 20 packages. For larger bulk orders, please contact us directly for custom pricing and delivery arrangements.
                </p>
                <a href="mailto:orders@mothership.com" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                  <Mail className="w-4 h-4" />
                  Contact Us for Bulk Orders
                </a>
              </div>
            </div>
          )}

          {/* Volume Discount Unlocked Messages */}
          {getTotalMeals() >= 100 && (
            <div className="mb-6 rounded-2xl p-4 border-2 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300 flex items-center gap-3">
              <Star className="w-6 h-6 text-amber-500 fill-current flex-shrink-0" />
              <p className="font-bold text-amber-800">
                🎉 Bulk Order Bonus Unlocked! You've qualified for our exclusive 22% volume discount on {getTotalMeals()} meals per month!
              </p>
            </div>
          )}
          {getTotalMeals() >= 13 && getTotalMeals() < 100 && subscriptionMode === 'package' && getTotalPackages() > 1 && (
            <div className="mb-6 rounded-2xl p-4 border-2 bg-green-50 border-green-300 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <p className="font-bold text-green-800">
                🎯 Smart Savings! By combining {getTotalPackages()} packages, you've reached {getTotalMeals()} total meals and unlocked {(getVolumeDiscount() * 100).toFixed(0)}% volume discount across your entire order!
              </p>
            </div>
          )}

          {/* Package Selection Grid - Only show in subscription + package mode */}
          {orderMode === 'subscription' && subscriptionMode === 'package' && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-charcoal mb-6">Choose Your Packages</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {mockMealPackages.map((pkg) => {
                  const qty = packageQuantities[pkg.id] || 0
                  return (
                    <div
                      key={pkg.id}
                      className={`backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border-2 transition-all ${
                        qty > 0
                          ? 'border-terracotta bg-terracotta/10'
                          : 'border-white/20 bg-white/90'
                      }`}
                    >
                      {/* Package Image */}
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={pkg.image}
                          alt={pkg.name}
                          fill
                          className="object-cover"
                        />
                        {qty > 0 && (
                          <div className="absolute top-3 right-3 bg-terracotta text-white rounded-full px-3 py-1 shadow-lg font-bold">
                            {qty}x
                          </div>
                        )}
                        {pkg.isPopular && (
                          <div className="absolute top-3 left-3 bg-terracotta text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Popular
                          </div>
                        )}
                      </div>

                      {/* Package Details */}
                      <div className="p-6">
                        <h3 className="font-bold text-xl text-charcoal mb-1">{pkg.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{pkg.mealCount} meals • {pkg.duration}</p>
                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{pkg.description}</p>

                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-2xl font-bold text-sage-green">
                            {formatPrice(pkg.price * (1 - getMemberDiscount()))}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(pkg.price)}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between bg-white rounded-xl p-2 border border-gray-200">
                          <button
                            onClick={() => handlePackageQuantityChange(pkg.id, -1)}
                            disabled={qty === 0}
                            className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4 text-charcoal" />
                          </button>
                          <span className="text-lg font-bold text-charcoal min-w-[3ch] text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => handlePackageQuantityChange(pkg.id, 1)}
                            disabled={getTotalPackages() >= 20 && qty === (packageQuantities[pkg.id] || 0)}
                            className="w-10 h-10 rounded-lg bg-sage-green hover:bg-sage-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Custom Meal Selection - Only show in subscription + custom mode OR extras mode */}
          {((orderMode === 'subscription' && subscriptionMode === 'custom') || orderMode === 'extras') && (
            <>
              {/* Interactive Discount Tier Progress - Only in subscription custom mode */}
              {orderMode === 'subscription' && subscriptionMode === 'custom' && (
                <div className="mb-8 backdrop-blur-xl bg-white/90 rounded-3xl p-8 shadow-xl border border-white/20">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-charcoal mb-2">Build Your Custom Plan</h2>
                    <p className="text-gray-600">Order more to unlock bigger savings! Progress through discount tiers below.</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-charcoal">
                        {getTotalMeals()} meals selected
                      </span>
                      <span className="text-sm font-semibold text-sage-green">
                        {getTotalMeals() >= 100 ? '22% MAX DISCOUNT! 🎉' :
                         getTotalMeals() >= 13 ? '15% discount unlocked' :
                         getTotalMeals() >= 8 ? '10% discount unlocked' :
                         getTotalMeals() >= 5 ? '5% discount unlocked' :
                         'Select 5+ to unlock savings'}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          getTotalMeals() >= 100 ? 'bg-gradient-to-r from-amber-400 to-yellow-500' :
                          getTotalMeals() >= 13 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                          getTotalMeals() >= 8 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                          getTotalMeals() >= 5 ? 'bg-gradient-to-r from-sage-green to-sage-700' :
                          'bg-gray-400'
                        }`}
                        style={{
                          width: `${Math.min(100, (getTotalMeals() / 100) * 100)}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Discount Tier Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {/* Tier 1: 5 meals */}
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                      getTotalMeals() >= 5
                        ? 'border-sage-green bg-sage-green/10 scale-105'
                        : 'border-gray-200 bg-white opacity-60'
                    }`}>
                      <div className="text-2xl mb-1">{getTotalMeals() >= 5 ? '✓' : '🎯'}</div>
                      <div className="font-bold text-lg text-charcoal">5 meals</div>
                      <div className="text-xs text-green-600 font-semibold mt-1">5% off</div>
                      {getTotalMeals() < 5 && (
                        <div className="text-xs text-gray-500 mt-1">{5 - getTotalMeals()} more</div>
                      )}
                    </div>

                    {/* Tier 2: 8 meals */}
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                      getTotalMeals() >= 8
                        ? 'border-blue-500 bg-blue-50 scale-105'
                        : 'border-gray-200 bg-white opacity-60'
                    }`}>
                      <div className="text-2xl mb-1">{getTotalMeals() >= 8 ? '✓' : '🎯'}</div>
                      <div className="font-bold text-lg text-charcoal">8 meals</div>
                      <div className="text-xs text-blue-600 font-semibold mt-1">10% off</div>
                      {getTotalMeals() < 8 && (
                        <div className="text-xs text-gray-500 mt-1">{8 - getTotalMeals()} more</div>
                      )}
                    </div>

                    {/* Tier 3: 13 meals */}
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                      getTotalMeals() >= 13
                        ? 'border-emerald-500 bg-emerald-50 scale-105'
                        : 'border-gray-200 bg-white opacity-60'
                    }`}>
                      <div className="text-2xl mb-1">{getTotalMeals() >= 13 ? '✓' : '🎯'}</div>
                      <div className="font-bold text-lg text-charcoal">13 meals</div>
                      <div className="text-xs text-emerald-600 font-semibold mt-1">15% off</div>
                      {getTotalMeals() >= 5 && getTotalMeals() < 13 && (
                        <div className="text-xs text-gray-500 mt-1">{13 - getTotalMeals()} more</div>
                      )}
                    </div>

                    {/* Bulk Contact Card */}
                    <div className="p-4 rounded-xl border-2 border-purple-300 bg-purple-50 text-center">
                      <div className="text-2xl mb-1">📧</div>
                      <div className="font-bold text-sm text-charcoal">Need more?</div>
                      <a href="mailto:orders@mothership.com" className="text-xs text-purple-600 font-semibold mt-1 hover:underline">
                        Contact us
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Meals Count */}
              <div className="mb-6">
                <p className="text-sage-green font-semibold text-lg">
                  <span className="text-3xl font-bold">{filteredMeals.length}</span> meals available
                </p>
              </div>

              {/* Meals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMeals.map((meal) => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    showQuantitySelector={true}
                    quantity={customMealQuantities[meal.id] || 0}
                    onQuantityChange={(qty) => handleCustomMealQuantityChange(meal.id, qty)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Mode-Specific Info Banner */}
          <div className="mt-12 backdrop-blur-xl bg-gradient-to-r from-sage-green/10 to-blush/10 rounded-3xl p-8 border border-sage-green/20 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage-green to-sage-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                {orderMode === 'subscription' ? (
                  <Calendar className="w-6 h-6 text-white" />
                ) : (
                  <ShoppingCart className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                {orderMode === 'subscription' ? (
                  <>
                    <h3 className="text-2xl font-bold text-charcoal mb-2">Subscription Preferences</h3>
                    <p className="text-gray-700 mb-4">
                      Select your favorite meals to customize your monthly delivery. Changes will be reflected in your next subscription box.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="px-4 py-2 backdrop-blur-xl bg-sage-green/20 text-sage-green rounded-full text-sm font-semibold">
                        ✓ Auto-delivered monthly
                      </div>
                      <div className="px-4 py-2 backdrop-blur-xl bg-sage-green/20 text-sage-green rounded-full text-sm font-semibold">
                        ✓ Skip or modify anytime
                      </div>
                      <div className="px-4 py-2 backdrop-blur-xl bg-sage-green/20 text-sage-green rounded-full text-sm font-semibold">
                        ✓ Save 15% vs one-time
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-charcoal mb-2">Order Extras Anytime</h3>
                    <p className="text-gray-700 mb-4">
                      Need extra meals between deliveries? Order any quantity for one-time delivery with member pricing and free shipping.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="px-4 py-2 backdrop-blur-xl bg-sage-green/20 text-sage-green rounded-full text-sm font-semibold">
                        ✓ 10% Member Discount
                      </div>
                      <div className="px-4 py-2 backdrop-blur-xl bg-sage-green/20 text-sage-green rounded-full text-sm font-semibold">
                        ✓ Free Shipping
                      </div>
                      <div className="px-4 py-2 backdrop-blur-xl bg-sage-green/20 text-sage-green rounded-full text-sm font-semibold">
                        ✓ Ships within 2-3 days
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Unlock Confirmation Modal */}
          {showUnlockModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in-scale">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sage-green/10 mx-auto mb-4">
                  <Lock className="w-8 h-8 text-sage-green" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal text-center mb-3">
                  Unlock Your Menu?
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Your subscription menu is currently locked to protect your order. Would you like to unlock it to make changes?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowUnlockModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-charcoal rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUnlockAndEdit}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-sage-green to-sage-700 hover:from-sage-700 hover:to-sage-green text-white rounded-xl font-semibold transition-all shadow-lg"
                  >
                    Unlock & Edit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Save Changes Confirmation Modal */}
          {showSaveChangesModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in-scale">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal text-center mb-3">
                  Save Your Changes?
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  You have unsaved changes to your subscription. Would you like to save them before locking your menu?
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleSaveChanges}
                    className="w-full px-6 py-3 bg-gradient-to-r from-sage-green to-sage-700 hover:from-sage-700 hover:to-sage-green text-white rounded-xl font-semibold transition-all shadow-lg"
                  >
                    Save & Lock Menu
                  </button>
                  <button
                    onClick={handleDiscardChanges}
                    className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-charcoal rounded-xl font-semibold transition-colors"
                  >
                    Discard Changes
                  </button>
                  <button
                    onClick={() => setShowSaveChangesModal(false)}
                    className="w-full px-6 py-3 text-gray-600 hover:text-charcoal font-semibold transition-colors"
                  >
                    Continue Editing
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
