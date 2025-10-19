'use client'

import ProtectedRoute from '@/components/protected-route'
import PortalNav from '@/components/portal-nav'
import { useAppStore } from '@/lib/store'
import { User, Mail, Phone, Bell, Lock, CreditCard } from 'lucide-react'

export default function SettingsPage() {
  const user = useAppStore((state) => state.user)

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-cream">
        <PortalNav />

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-charcoal mb-2">Settings</h1>
            <p className="text-charcoal-70">Manage your account and preferences</p>
          </div>

          {/* Profile Information */}
          <div className="bg-white rounded-3xl p-8 mb-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-sage" />
              <h2 className="text-2xl font-bold text-charcoal">Profile Information</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.firstName || ''}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Johnson"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sage"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Email Address
                </label>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-charcoal-60" />
                  <input
                    type="email"
                    defaultValue={user?.email || ''}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sage"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Phone Number
                </label>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-charcoal-60" />
                  <input
                    type="tel"
                    defaultValue="(555) 123-4567"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sage"
                  />
                </div>
              </div>

              <button className="px-6 py-3 bg-sage text-white rounded-xl font-medium hover:bg-sage-600 transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-3xl p-8 mb-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-sage" />
              <h2 className="text-2xl font-bold text-charcoal">Notification Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cream rounded-2xl">
                <div>
                  <div className="font-medium text-charcoal">Order Updates</div>
                  <div className="text-sm text-charcoal-70">
                    Get notified about order status and delivery
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sage"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-cream rounded-2xl">
                <div>
                  <div className="font-medium text-charcoal">Menu Updates</div>
                  <div className="text-sm text-charcoal-70">
                    New menu items and weekly specials
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sage"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-cream rounded-2xl">
                <div>
                  <div className="font-medium text-charcoal">Event Invitations</div>
                  <div className="text-sm text-charcoal-70">
                    Workshops, classes, and community events
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sage"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-cream rounded-2xl">
                <div>
                  <div className="font-medium text-charcoal">Marketing Emails</div>
                  <div className="text-sm text-charcoal-70">
                    Promotions, tips, and special offers
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sage"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-3xl p-8 mb-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-sage" />
              <h2 className="text-2xl font-bold text-charcoal">Security</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cream rounded-2xl">
                <div>
                  <div className="font-medium text-charcoal">Password</div>
                  <div className="text-sm text-charcoal-70">
                    Last changed 3 months ago
                  </div>
                </div>
                <button className="px-4 py-2 bg-sage text-white rounded-lg font-medium hover:bg-sage-600 transition-colors">
                  Change Password
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-cream rounded-2xl">
                <div>
                  <div className="font-medium text-charcoal">Two-Factor Authentication</div>
                  <div className="text-sm text-charcoal-70">
                    Add an extra layer of security
                  </div>
                </div>
                <button className="px-4 py-2 border border-sage text-sage rounded-lg font-medium hover:bg-sage/10 transition-colors">
                  Enable
                </button>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-sage" />
              <h2 className="text-2xl font-bold text-charcoal">Payment Methods</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cream rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <div className="font-medium text-charcoal">•••• 4242</div>
                    <div className="text-sm text-charcoal-70">Expires 12/25</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sage hover:bg-sage/10 rounded-lg transition-colors">
                    Edit
                  </button>
                  <button className="px-4 py-2 text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors">
                    Remove
                  </button>
                </div>
              </div>

              <button className="w-full py-3 border-2 border-dashed border-gray-300 text-charcoal-70 rounded-xl font-medium hover:border-sage hover:text-sage transition-colors">
                + Add Payment Method
              </button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
