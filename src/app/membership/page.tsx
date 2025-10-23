'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Star, Sparkles, Crown, Check } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useState, useEffect, Suspense } from 'react'

type MembershipTier = 'basic' | 'premium' | 'vip'

function MembershipContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const addToCart = useAppStore((state) => state.addToCart)
  const user = useAppStore((state) => state.user)

  // Get current tier from URL param or user state
  const [currentTier, setCurrentTier] = useState<MembershipTier>('basic')

  useEffect(() => {
    const tierParam = searchParams.get('tier') as MembershipTier
    if (tierParam && ['basic', 'premium', 'vip'].includes(tierParam)) {
      setCurrentTier(tierParam)
    } else if (user?.subscriptionTier) {
      setCurrentTier(user.subscriptionTier as MembershipTier)
    }
  }, [searchParams, user])

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
  // Render VIP congratulations page
  const renderVIPCongrats = () => (
    <section className="py-24 px-6 flex flex-col items-center max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mb-6 animate-bounce-in">
          <Crown className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-cedarville text-5xl md:text-6xl text-sage-green mb-4">
          Welcome to VIP!
        </h1>
        <p className="text-charcoal/70 text-xl">
          You&apos;ve unlocked the ultimate Mothership experience
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-amber-200 w-full">
        <h2 className="text-2xl font-semibold text-charcoal mb-6 text-center">
          Your VIP Benefits
        </h2>
        <ul className="space-y-4 mb-8">
          {[
            'Everything in Premium',
            '15% off all meals & packages',
            'Free shipping (always)',
            '1-on-1 nutrition consultation',
            'Exclusive VIP events',
            'Custom meal recommendations',
            'Gift packages for referrals'
          ].map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-3 text-charcoal">
              <Check className="w-5 h-5 text-sage-green flex-shrink-0 mt-0.5" />
              <span className="text-lg">{benefit}</span>
            </li>
          ))}
        </ul>
        <div className="text-center">
          <p className="text-charcoal/70 mb-4">Ready to start ordering?</p>
          <Link href="/meals" className="inline-block bg-gradient-to-r from-sage-green to-sage-700 text-white px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg font-semibold">
            Browse Our Meals →
          </Link>
        </div>
      </div>
    </section>
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF8F5' }}>
      <Header />

      {currentTier === 'vip' ? renderVIPCongrats() : (
        <section className="py-24 px-6 flex flex-col items-center">
          <h1 className="font-cedarville text-5xl md:text-6xl text-sage-green mb-4 text-center">
            {currentTier === 'basic' ? 'Join Mothership' : 'Upgrade Your Membership'}
          </h1>
          <p className="text-charcoal/70 text-lg md:text-xl text-center mb-16 max-w-2xl">
            {currentTier === 'basic'
              ? 'Choose the level of support that\'s right for your journey'
              : 'Unlock even more benefits with VIP access'}
          </p>

          {/* Pricing Cards Container */}
          <div className={`grid grid-cols-1 gap-8 max-w-6xl w-full ${currentTier === 'basic' ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-4xl'}`}>

          {/* BASIC PLAN - Only show if current tier is basic */}
          {currentTier === 'basic' && (
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
            <Link href="/auth/signup" className="w-full">
              <button className="w-full border border-sage-green text-sage-green px-8 py-3 rounded-md hover:bg-sage-50 transition-colors duration-300">
                Start Free
              </button>
            </Link>
          </div>
          )}

          {/* PREMIUM PLAN */}
          <div className={`relative bg-white rounded-xl shadow-xl p-8 flex flex-col items-center border-2 ${
            currentTier === 'premium'
              ? 'border-sage-green bg-sage-green/5'
              : 'border-terracotta'
          } ${currentTier === 'basic' ? 'transform md:scale-105' : ''} hover:shadow-2xl transition-all duration-300`}>
            {/* Badge */}
            {currentTier === 'basic' && (
              <span className="absolute -top-4 bg-terracotta text-white text-xs font-semibold uppercase tracking-wide px-6 py-2 rounded-full shadow-md">
                Most Popular
              </span>
            )}
            {currentTier === 'premium' && (
              <span className="absolute -top-4 bg-sage-green text-white text-xs font-semibold uppercase tracking-wide px-6 py-2 rounded-full shadow-md">
                Current Plan
              </span>
            )}
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
            {currentTier === 'premium' ? (
              <div className="w-full text-center text-sage-green font-semibold">
                Your Current Plan
              </div>
            ) : (
              <button
                onClick={handlePremiumClick}
                className="w-full bg-sage-green text-white px-8 py-3 rounded-md hover:bg-sage-600 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                {currentTier === 'basic' ? 'Join Premium' : 'Select Premium'}
              </button>
            )}
          </div>

          {/* VIP PLAN */}
          <div className={`relative bg-white rounded-xl shadow-md p-8 flex flex-col items-center border ${
            currentTier === 'premium'
              ? 'border-2 border-amber-400 transform md:scale-105'
              : 'border-sage-200'
          } hover:shadow-lg transition-shadow duration-300`}>
            {currentTier === 'premium' && (
              <span className="absolute -top-4 bg-amber-500 text-white text-xs font-semibold uppercase tracking-wide px-6 py-2 rounded-full shadow-md">
                Upgrade Available
              </span>
            )}
            <div className={currentTier === 'premium' ? 'text-amber-600 mb-4' : 'text-sage-green mb-4'}>
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
              className={`w-full px-8 py-3 rounded-md transition-colors duration-300 ${
                currentTier === 'premium'
                  ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-md hover:shadow-lg'
                  : 'border border-sage-green text-sage-green hover:bg-sage-50'
              }`}
            >
              {currentTier === 'basic' ? 'Join VIP' : 'Upgrade to VIP'}
            </button>
          </div>
        </div>

        {/* Extra benefits for premium users */}
        {currentTier === 'premium' && (
          <div className="mt-12 max-w-3xl mx-auto bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl p-8 border-2 border-amber-200">
            <h3 className="text-2xl font-semibold text-charcoal mb-4 text-center">
              🎁 Upgrade to VIP & Get
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: '+5% More Savings', desc: '15% off instead of 10%' },
                { title: 'Free Shipping Always', desc: 'No minimum order required' },
                { title: '1-on-1 Consultation', desc: 'Personal nutrition guidance' },
                { title: 'VIP Exclusive Events', desc: 'Private workshops & tastings' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white rounded-xl p-4">
                  <Check className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-charcoal">{item.title}</p>
                    <p className="text-sm text-charcoal/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Additional Information Section */}
        <div className="mt-20 max-w-4xl mx-auto text-center">
          <h2 className="font-cedarville text-4xl text-sage-green mb-6">
            Why Become a Member?
          </h2>
          <p className="text-charcoal/70 text-lg leading-relaxed mb-8">
            Our membership program is designed to provide ongoing support throughout your postpartum journey.
            From meal discounts to nutrition guidance and community connection, we&apos;re here to nourish you every step of the way.
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
      )}

      <Footer />
    </div>
  )
}

export default function MembershipPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: '#FAF8F5' }}><Header /><div className="py-24 text-center">Loading...</div><Footer /></div>}>
      <MembershipContent />
    </Suspense>
  )
}
