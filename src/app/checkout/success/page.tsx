'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAppStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { CheckCircle2, Sparkles, ArrowRight, Calendar, CreditCard, Mail } from 'lucide-react'

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const { isAuthenticated, user, setUser } = useAppStore()
  const [orderData, setOrderData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    // Load order data from sessionStorage
    const storedOrderData = sessionStorage.getItem('completedOrder')
    if (!storedOrderData) {
      router.push('/cart')
      return
    }

    const parsedOrderData = JSON.parse(storedOrderData)
    setOrderData(parsedOrderData)

    // If this was a subscription purchase, update user state
    if (parsedOrderData.subscription && user && user.email) {
      setUser({
        ...user,
        email: user.email,
        isMember: true,
        isSubscribed: true,
        subscription: {
          status: 'active',
          nextDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
          }),
          mealPlanSize: parsedOrderData.subscription.mealPlanSize || 12,
          totalSavings: 0,
          orders: 1,
          dayStreak: 1
        }
      })
    }

    // Clear the stored order data after a delay
    setTimeout(() => {
      sessionStorage.removeItem('completedOrder')
    }, 1000)

    setLoading(false)
  }, [isAuthenticated, router, setUser, user])

  if (loading || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9F6F1' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-green mx-auto mb-4"></div>
          <p className="text-charcoal/60">Processing your order...</p>
        </div>
      </div>
    )
  }

  const isSubscription = orderData.subscription !== null

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F6F1' }}>
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Success Icon */}
        <div className="text-center mb-12 animate-fade-in-scale">
          <div className="inline-block p-6 rounded-full bg-gradient-to-br from-sage-green to-sage-700 mb-6 shadow-2xl">
            <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="font-cedarville text-5xl md:text-6xl text-sage-green mb-4">
            {isSubscription ? 'Welcome to Mothership!' : 'Order Complete!'}
          </h1>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            {isSubscription
              ? 'Your subscription is now active. Thank you for joining our community!'
              : 'Thank you for your order. We can\'t wait to nourish you!'}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-sage-200 mb-8 animate-fade-in-up">
          {/* User Info */}
          <div className="mb-8 pb-8 border-b border-sage-200">
            <h2 className="text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-sage-green" />
              Confirmation sent to
            </h2>
            <p className="text-lg text-charcoal font-medium">{user?.email}</p>
            <p className="text-sm text-charcoal/60 mt-1">
              You're logged in as <span className="text-sage-green font-semibold">@{user?.username || 'user'}</span>
            </p>
          </div>

          {/* Subscription Details */}
          {isSubscription && (
            <div className="mb-8 pb-8 border-b border-sage-200">
              <h2 className="text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-terracotta" />
                Your Subscription
              </h2>
              <div className="bg-gradient-to-r from-sage-green/10 to-sage-700/10 rounded-2xl p-6 border border-sage-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal mb-1">
                      {orderData.subscription.name}
                    </h3>
                    <p className="text-charcoal/60">{orderData.subscription.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-sage-green">
                      {formatPrice(orderData.subscription.price)}
                    </p>
                    <p className="text-sm text-charcoal/60">per month</p>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-sage-green flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-charcoal">Next billing date</p>
                      <p className="text-sm text-charcoal/70">{user?.subscription?.nextBillingDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-sage-green flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-charcoal">Payment method</p>
                      <p className="text-sm text-charcoal/70">Card ending in ••••</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-charcoal mb-4">Order Items</h2>
            <div className="space-y-4">
              {orderData.items.map((item: any) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-sage-50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-charcoal">{item.name}</h3>
                    <p className="text-sm text-charcoal/60">{item.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {item.type === 'subscription' ? (
                        <span className="text-xs px-2 py-1 bg-terracotta/10 text-terracotta rounded-full font-medium">
                          Monthly Subscription
                        </span>
                      ) : (
                        <span className="text-sm text-charcoal/60">Qty: {item.quantity}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sage-green">
                      {formatPrice(item.price * item.quantity)}
                      {item.type === 'subscription' && <span className="text-sm text-charcoal/60">/mo</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t border-sage-200 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-charcoal">
                {isSubscription ? 'First Payment' : 'Total Paid'}
              </span>
              <span className="text-3xl font-bold text-sage-green">
                {formatPrice(orderData.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <Link
            href="/portal"
            className="bg-gradient-to-r from-sage-green to-sage-700 text-white rounded-2xl px-8 py-5 font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-5 h-5" />
            Go to Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/meals"
            className="bg-white border-2 border-sage-green text-sage-green rounded-2xl px-8 py-5 font-semibold hover:bg-sage-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Additional Info */}
        {isSubscription && (
          <div className="mt-12 bg-sage-50 rounded-2xl p-6 border border-sage-200">
            <h3 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-sage-green" />
              What happens next?
            </h3>
            <ul className="space-y-2 text-sm text-charcoal/70">
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">•</span>
                <span>You can manage your subscription anytime from your dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">•</span>
                <span>Your next billing date is {user?.subscription?.nextBillingDate}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">•</span>
                <span>Start enjoying your membership benefits immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">•</span>
                <span>Cancel or pause your subscription anytime with no penalties</span>
              </li>
            </ul>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
