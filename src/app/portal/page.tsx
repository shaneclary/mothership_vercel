'use client'

import ProtectedRoute from '@/components/protected-route'
import PortalNav from '@/components/portal-nav'
import { useAppStore } from '@/lib/store'
import Link from 'next/link'
import { ShoppingBag, CreditCard, BookOpen, Calendar, TrendingUp } from 'lucide-react'

export default function PortalPage() {
  const user = useAppStore((state) => state.user)

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen relative overflow-hidden" style={{ backgroundColor: '#F9F6F1' }}>
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sage-green rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blush rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-terracotta rounded-full blur-3xl" />
        </div>

        <PortalNav />

        <main className="flex-1 md:p-8 p-4 pt-20 md:pt-8 relative z-10">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-5xl font-bold text-sage-green mb-3 font-cedarville">
              Welcome back, {user?.firstName || 'friend'}!
            </h1>
            <p className="text-gray-600 text-lg">
              Here&apos;s what&apos;s happening with your Mothership journey
            </p>
          </div>

          {/* Subscription Status Card */}
          {user?.subscription && (
            <div className="relative overflow-hidden bg-gradient-to-br from-sage-green via-sage-600 to-sage-700 rounded-3xl p-8 mb-8 text-white shadow-2xl hover:shadow-sage-green/30 transition-all duration-500 animate-fade-in-scale">
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="inline-flex items-center backdrop-blur-xl bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-3 shadow-lg">
                      <span className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse" />
                      Active Member
                    </div>
                    <h2 className="text-3xl font-bold mb-2">
                      {user.subscription.mealPlanSize} Meal Plan
                    </h2>
                    <p className="text-white/90 text-lg">
                      Next delivery: <span className="font-semibold">{user.subscription.nextDelivery}</span>
                    </p>
                  </div>
                  <Link
                    href="/portal/subscription"
                    className="bg-white text-sage-green px-6 py-3 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    Manage Plan
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                  <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300">
                    <div className="text-4xl font-bold mb-1">{user.subscription.orders}</div>
                    <div className="text-white/90 text-sm font-medium uppercase tracking-wider">Total Orders</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300">
                    <div className="text-4xl font-bold mb-1">{user.subscription.dayStreak}</div>
                    <div className="text-white/90 text-sm font-medium uppercase tracking-wider">Day Streak</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300">
                    <div className="text-4xl font-bold mb-1">${user.subscription.totalSavings}</div>
                    <div className="text-white/90 text-sm font-medium uppercase tracking-wider">Total Savings</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-sage-green mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/portal/meals"
                className="backdrop-blur-xl bg-white/90 rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group animate-fade-in-scale"
                style={{ animationDelay: '0ms' }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-sage-green to-sage-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <ShoppingBag className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-charcoal mb-2 text-lg">Browse Meals</h3>
                <p className="text-sm text-gray-600">
                  Explore our weekly menu
                </p>
              </Link>

              <Link
                href="/portal/subscription"
                className="backdrop-blur-xl bg-white/90 rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group animate-fade-in-scale"
                style={{ animationDelay: '100ms' }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-terracotta to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-charcoal mb-2 text-lg">Manage Subscription</h3>
                <p className="text-sm text-gray-600">
                  Update your plan & delivery
                </p>
              </Link>

              <Link
                href="/portal/resources"
                className="backdrop-blur-xl bg-white/90 rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group animate-fade-in-scale"
                style={{ animationDelay: '200ms' }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blush to-pink-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-charcoal mb-2 text-lg">Digital Resources</h3>
                <p className="text-sm text-gray-600">
                  Access guides & recipes
                </p>
              </Link>

              <Link
                href="/portal/events"
                className="backdrop-blur-xl bg-white/90 rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group animate-fade-in-scale"
                style={{ animationDelay: '300ms' }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-sage-600 to-sage-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-charcoal mb-2 text-lg">View Events</h3>
                <p className="text-sm text-gray-600">
                  Join workshops & classes
                </p>
              </Link>
            </div>
          </div>

          {/* Journey Stats */}
          <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 shadow-xl border border-white/20 animate-fade-in-scale" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sage-green to-sage-700 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-sage-green">
                Your Journey
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 backdrop-blur-xl bg-sage-green/5 rounded-2xl border border-sage-green/10 hover:bg-sage-green/10 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="text-4xl font-bold text-sage-green mb-2">
                  {user?.memberSince || 'N/A'}
                </div>
                <div className="text-sm text-gray-600 font-semibold uppercase tracking-wider">Member Since</div>
              </div>

              <div className="text-center p-6 backdrop-blur-xl bg-sage-green/5 rounded-2xl border border-sage-green/10 hover:bg-sage-green/10 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="text-4xl font-bold text-sage-green mb-2">
                  {user?.subscription?.orders || 0}
                </div>
                <div className="text-sm text-gray-600 font-semibold uppercase tracking-wider">Orders Completed</div>
              </div>

              <div className="text-center p-6 backdrop-blur-xl bg-sage-green/5 rounded-2xl border border-sage-green/10 hover:bg-sage-green/10 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="text-4xl font-bold text-sage-green mb-2">
                  {user?.subscription?.dayStreak || 0}
                </div>
                <div className="text-sm text-gray-600 font-semibold uppercase tracking-wider">Day Streak</div>
              </div>

              <div className="text-center p-6 backdrop-blur-xl bg-sage-green/5 rounded-2xl border border-sage-green/10 hover:bg-sage-green/10 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="text-4xl font-bold text-sage-green mb-2">
                  ${user?.subscription?.totalSavings || 0}
                </div>
                <div className="text-sm text-gray-600 font-semibold uppercase tracking-wider">Total Savings</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
