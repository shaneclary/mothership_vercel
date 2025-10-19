'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import PortalNav from '@/components/PortalNav';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

function SubscriptionContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="bg-white px-4 py-4 border-b sticky top-0 z-10">
        <h1 className="font-serif text-2xl text-charcoal text-center">Subscription</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-charcoal mb-8">Your Subscription</h2>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-bold text-charcoal mb-4">Current Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Plan Size</span>
              <span className="font-semibold text-charcoal">12 meals</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Price</span>
              <span className="font-semibold text-charcoal">$159.99</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Next Delivery</span>
              <span className="font-semibold text-charcoal">10/22/2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Meal Selection</span>
              <span className="font-semibold text-sage-green">Chef Choice</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-charcoal mb-4">Quick Actions</h3>
        <div className="space-y-3 mb-6">
          <button className="w-full bg-white rounded-2xl p-4 shadow-md flex items-center justify-between hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl">
                ⏸️
              </div>
              <div className="text-left">
                <p className="font-bold text-charcoal">Pause Subscription</p>
                <p className="text-sm text-gray-600">Temporarily stop deliveries</p>
              </div>
            </div>
            <span>→</span>
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-md flex items-center justify-between hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                ⏭️
              </div>
              <div className="text-left">
                <p className="font-bold text-charcoal">Skip Next Delivery</p>
                <p className="text-sm text-gray-600">Move delivery to next week</p>
              </div>
            </div>
            <span>→</span>
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-md flex items-center justify-between hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">
                ✕
              </div>
              <div className="text-left">
                <p className="font-bold text-charcoal">Cancel Subscription</p>
                <p className="text-sm text-gray-600">End your membership</p>
              </div>
            </div>
            <span>→</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-bold text-charcoal mb-4">Change Plan Size</h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer hover:border-sage-green transition">
              <div>
                <p className="font-semibold text-charcoal">8 meals</p>
                <p className="text-sm text-gray-600">$119.99/month</p>
              </div>
              <div className="text-right">
                <p className="text-sage-green font-semibold">$15.00/meal</p>
              </div>
            </label>

            <label className="flex items-center justify-between p-4 border-2 border-sage-green rounded-xl cursor-pointer bg-sage-green bg-opacity-5">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-charcoal">12 meals</p>
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <p className="text-sm text-gray-600">$159.99/month</p>
              </div>
              <div className="text-right">
                <p className="text-sage-green font-semibold">$13.33/meal</p>
              </div>
            </label>

            <label className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer hover:border-sage-green transition">
              <div>
                <p className="font-semibold text-charcoal">16 meals</p>
                <p className="text-sm text-gray-600">$199.99/month</p>
              </div>
              <div className="text-right">
                <p className="text-sage-green font-semibold">$12.50/meal</p>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-charcoal mb-4">Meal Selection</h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 border-2 border-sage-green rounded-xl cursor-pointer bg-sage-green bg-opacity-5">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-charcoal">Chef's Choice</p>
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <p className="text-sm text-gray-600">Let our chefs surprise you with weekly selections</p>
              </div>
            </label>

            <label className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer hover:border-sage-green transition">
              <div>
                <p className="font-semibold text-charcoal">Custom Selection</p>
                <p className="text-sm text-gray-600">Choose your own meals from our weekly menu</p>
              </div>
            </label>

            <label className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer hover:border-sage-green transition">
              <div>
                <p className="font-semibold text-charcoal">Keep Previous Selection</p>
                <p className="text-sm text-gray-600">Repeat your last meal selection automatically</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <PortalNav />
    </div>
  );
}

export default function SubscriptionPage() {
  return (
    <ProtectedRoute>
      <SubscriptionContent />
    </ProtectedRoute>
  );
}
