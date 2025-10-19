'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/protected-route'
import PortalNav from '@/components/portal-nav'
import { useAppStore } from '@/lib/store'
import { mockMealPackages } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import { Calendar, CreditCard, Truck, Settings, CheckCircle, Star } from 'lucide-react'
import Image from 'next/image'

export default function SubscriptionPage() {
  const user = useAppStore((state) => state.user)
  const [deliveryFrequency, setDeliveryFrequency] = useState<'weekly' | 'monthly'>('monthly')

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-cream">
        <PortalNav />

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-charcoal mb-2">Subscription</h1>
            <p className="text-charcoal-70">Manage your meal plan and delivery preferences</p>
          </div>

          {/* Current Plan */}
          <div className="bg-white rounded-3xl p-8 mb-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-sage" />
                  <span className="text-sm font-medium text-sage">Active</span>
                </div>
                <h2 className="text-2xl font-bold text-charcoal mb-1">
                  {user?.subscription?.mealPlanSize || 12} Meal Plan
                </h2>
                <p className="text-charcoal-70">
                  {formatPrice(((user?.subscription?.mealPlanSize || 12) * 12.99) * 4)}/month
                </p>
              </div>
              <button className="px-6 py-3 bg-sage text-white rounded-xl font-medium hover:bg-sage-600 transition-colors">
                Change Plan
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <div className="font-medium text-charcoal">Next Delivery</div>
                  <div className="text-sm text-charcoal-70">
                    {user?.subscription?.nextDelivery || 'Not scheduled'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-terracotta/10 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <div className="font-medium text-charcoal">Payment Method</div>
                  <div className="text-sm text-charcoal-70">•••• 4242</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-dusty-rose/10 rounded-xl flex items-center justify-center">
                  <Truck className="w-5 h-5 text-dusty-rose" />
                </div>
                <div>
                  <div className="font-medium text-charcoal">Delivery Day</div>
                  <div className="text-sm text-charcoal-70">Wednesday</div>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Options */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Available Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockMealPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-2xl overflow-hidden border-2 transition-all hover:shadow-lg ${
                    user?.subscription?.mealPlanSize === pkg.mealCount
                      ? 'border-terracotta shadow-md'
                      : 'border-gray-200 hover:border-terracotta/50'
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
                    <p className="text-sm text-charcoal-70 mb-3">{pkg.mealCount} meals • {pkg.duration}</p>

                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-bold text-sage-green">
                        {formatPrice(pkg.price)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(pkg.originalPrice)}
                      </span>
                    </div>
                    <div className="text-xs text-charcoal-70 mb-4">
                      {formatPrice(pkg.price / pkg.mealCount)} per meal
                    </div>

                    <button
                      className={`w-full py-3 rounded-xl font-medium transition-colors ${
                        user?.subscription?.mealPlanSize === pkg.mealCount
                          ? 'bg-sage/10 text-sage cursor-default'
                          : 'bg-sage text-white hover:bg-sage-600'
                      }`}
                      disabled={user?.subscription?.mealPlanSize === pkg.mealCount}
                    >
                      {user?.subscription?.mealPlanSize === pkg.mealCount
                        ? 'Current Plan'
                        : 'Select Plan'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Preferences */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-6 h-6 text-sage" />
              <h2 className="text-2xl font-bold text-charcoal">Delivery Preferences</h2>
            </div>

            <div className="space-y-6">
              {/* Delivery Frequency Toggle */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-3">
                  Delivery Frequency
                </label>
                <div className="inline-flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setDeliveryFrequency('weekly')}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      deliveryFrequency === 'weekly'
                        ? 'bg-sage text-white shadow-md'
                        : 'text-charcoal hover:bg-sage/10'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setDeliveryFrequency('monthly')}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      deliveryFrequency === 'monthly'
                        ? 'bg-sage text-white shadow-md'
                        : 'text-charcoal hover:bg-sage/10'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
                <p className="text-xs text-charcoal-70 mt-2">
                  {deliveryFrequency === 'weekly'
                    ? 'Fresh meals delivered every week'
                    : 'Fresh meals delivered once per month'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Preferred Delivery Day
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sage">
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option selected>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Delivery Address
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sage"
                  rows={3}
                  defaultValue="123 Main St&#10;San Francisco, CA 94102"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Special Instructions
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sage"
                  rows={2}
                  placeholder="Leave at front door, ring bell, etc."
                />
              </div>

              <button className="px-6 py-3 bg-sage text-white rounded-xl font-medium hover:bg-sage-600 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
