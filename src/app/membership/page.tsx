'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Star, Sparkles, Crown } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export default function MembershipPage() {
  const router = useRouter()
  const addToCart = useAppStore((state) => state.addToCart)

  const handlePremiumClick = () => {
    addToCart({
      id: 'membership-premium',
      name: 'Premium Membership',
      price: 19.99,
      image: '/logo/brandmark.png',
      description: '10% off all meals, exclusive resources, and priority support',
      type: 'subscription',
      subscriptionTier: 'premium',
      isRecurring: true,
    })
    router.push('/cart')
  }

  const handleVIPClick = () => {
    addToCart({
      id: 'membership-vip',
      name: 'VIP Membership',
      price: 39.99,
      image: '/logo/brandmark.png',
      description: '15% off all meals, 1-on-1 consultation, and exclusive VIP events',
      type: 'subscription',
      subscriptionTier: 'vip',
      isRecurring: true,
    })
    router.push('/cart')
  }
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF8F5' }}>
      <Header />

      <section className="py-24 px-6 flex flex-col items-center">
        <h1 className="font-cedarville text-5xl md:text-6xl text-sage-green mb-4 text-center">
          Mothership Membership
        </h1>
        <p className="text-charcoal/70 text-lg md:text-xl text-center mb-16 max-w-2xl">
          Choose the level of support that's right for your journey
        </p>

        {/* Pricing Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* BASIC PLAN */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center border border-sage-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-sage-green mb-4">
              <Sparkles className="h-12 w-12" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-semibold text-charcoal mb-2">Basic</h2>
            <p className="text-4xl font-bold text-sage-green mt-2 mb-6">$0</p>
            <ul className="text-sm text-charcoal/70 mb-8 space-y-3 w-full">
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>Browse all meals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>Order individual meals or packages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>Free shipping on orders $75+</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>Access to newsletter</span>
              </li>
            </ul>
            <Link href="/auth/login" className="w-full">
              <button className="w-full border border-sage-green text-sage-green px-8 py-3 rounded-md hover:bg-sage-50 transition-colors duration-300">
                Current Plan
              </button>
            </Link>
          </div>

          {/* PREMIUM PLAN - FEATURED */}
          <div className="relative bg-white rounded-xl shadow-xl p-8 flex flex-col items-center border-2 border-terracotta transform md:scale-105 hover:shadow-2xl transition-all duration-300">
            {/* Most Popular Ribbon */}
            <span className="absolute -top-4 bg-terracotta text-white text-xs font-semibold uppercase tracking-wide px-6 py-2 rounded-full shadow-md">
              Most Popular
            </span>
            <div className="text-sage-green mb-4 mt-2">
              <Star className="h-12 w-12" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-semibold text-charcoal mb-2">Premium</h2>
            <div className="text-4xl font-bold text-sage-green mt-2 mb-6">
              $19.99
              <span className="text-base font-normal text-charcoal/60">/month</span>
            </div>
            <ul className="text-sm text-charcoal/70 mb-8 space-y-3 w-full">
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>Everything in Basic</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>10% off all meals & packages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>Exclusive digital resources</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>Early access to events & classes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>Priority customer support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>Referral rewards program</span>
              </li>
            </ul>
            <button
              onClick={handlePremiumClick}
              className="w-full bg-sage-green text-white px-8 py-3 rounded-md hover:bg-sage-600 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Join Premium
            </button>
          </div>

          {/* VIP PLAN */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center border border-sage-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-sage-green mb-4">
              <Crown className="h-12 w-12" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-semibold text-charcoal mb-2">VIP</h2>
            <div className="text-4xl font-bold text-sage-green mt-2 mb-6">
              $39.99
              <span className="text-base font-normal text-charcoal/60">/month</span>
            </div>
            <ul className="text-sm text-charcoal/70 mb-8 space-y-3 w-full">
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>Everything in Premium</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>15% off all meals & packages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>Free shipping (always)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>1-on-1 nutrition consultation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>Exclusive VIP events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>Custom meal recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-green mt-0.5">✓</span>
                <span>Gift packages for referrals</span>
              </li>
            </ul>
            <button
              onClick={handleVIPClick}
              className="w-full border border-sage-green text-sage-green px-8 py-3 rounded-md hover:bg-sage-50 transition-colors duration-300"
            >
              Join VIP
            </button>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-20 max-w-4xl mx-auto text-center">
          <h2 className="font-cedarville text-4xl text-sage-green mb-6">
            Why Become a Member?
          </h2>
          <p className="text-charcoal/70 text-lg leading-relaxed mb-8">
            Our membership program is designed to provide ongoing support throughout your postpartum journey.
            From meal discounts to nutrition guidance and community connection, we're here to nourish you every step of the way.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-sage-200">
              <div className="text-3xl mb-3">💝</div>
              <h3 className="font-semibold text-charcoal mb-2">Save More</h3>
              <p className="text-sm text-charcoal/70">
                Enjoy exclusive discounts on all meals and packages
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-sage-200">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold text-charcoal mb-2">Learn More</h3>
              <p className="text-sm text-charcoal/70">
                Access exclusive postpartum resources and expert guidance
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-sage-200">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-semibold text-charcoal mb-2">Connect More</h3>
              <p className="text-sm text-charcoal/70">
                Join our community of mothers supporting each other
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="mt-16">
          <Link
            href="/contact"
            className="text-sage-green hover:text-sage-700 underline underline-offset-4 transition-colors"
          >
            Have questions? Contact us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
