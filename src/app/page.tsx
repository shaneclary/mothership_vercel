'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart, Flame, Truck, Star, CheckCircle, Sparkles } from 'lucide-react'
import { mockMealPackages, mockTestimonials, MealPackage } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import Header from '@/components/header'
import Footer from '@/components/footer'
import QuantitySelector from '@/components/quantity-selector'
import TitleText from '@/components/TitleText'
import TitleRule from '@/components/TitleRule'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function HomePage() {
  const featuredPackages = mockMealPackages.slice(0, 3) // Top 3 packages
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const { addToCart } = useCart()

  const handleQuantityChange = (packageId: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [packageId]: quantity }))
  }

  const handleAddToCart = (pkg: MealPackage): void => {
    const quantity = quantities[pkg.id] || 0
    if (quantity > 0) {
      addToCart(pkg, quantity)
      // Reset quantity after adding to cart
      setQuantities(prev => ({ ...prev, [pkg.id]: 0 }))
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFBF5' }}>
      <Header />

      {/* Hero Section - Soft gradient background matching Screenshot (182) */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 md:py-40 bg-gradient-to-b from-[#EAEDE6] via-[#F8F6F3] to-[#F2E7E1]">
        {/* Mothership brandmark with logo and name */}
        <div className="mb-8 animate-fade-in-up">
          <Image
            src="/logo/brandmark.png"
            alt="Mothership - Nourishment for the Fourth Trimester"
            width={400}
            height={140}
            className="mx-auto drop-shadow-lg"
            priority
          />
        </div>

        {/* Subtitle */}
        <p
          className="font-normal uppercase text-center max-w-2xl mb-10 animate-fade-in-up"
          style={{
            animationDelay: '200ms',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            letterSpacing: '0.15em',
            lineHeight: 1.2,
            fontSize: '0.9rem',
            color: '#A8B99C',
            textRendering: 'optimizeLegibility'
          }}
        >
          Nourishment for the Fourth Trimester
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <Link
            href="/meals"
            className="bg-sage-green text-white px-8 py-3 rounded-md shadow-md hover:bg-sage-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            Shop Meals
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/about"
            className="bg-white border border-sage-green/50 text-sage-700 px-8 py-3 rounded-md shadow-sm hover:bg-sage-50 hover:shadow-md transition-all duration-300"
          >
            Learn How
          </Link>
        </div>

        {/* Features row */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm text-charcoal/60 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-sage-green inline" />
            Nutritionist-Designed
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-sage-green inline" />
            Flash-Frozen Fresh
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-sage-green inline" />
            Delivered to Your Door
          </span>
        </div>
      </section>

      {/* Brand Story Section - Modern glass card effect */}
      <section className="px-4 py-20 relative">
        <div className="mx-auto max-w-6xl">
          <div className="group overflow-hidden rounded-3xl backdrop-blur-xl bg-white/90 p-8 md:p-12 shadow-2xl hover:shadow-sage-green/20 transition-all duration-500 border border-white/20 md:flex md:items-center md:gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sage-green to-sage-700 flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-sage-green uppercase tracking-wider">Our Story</span>
                </div>
              </div>
              <TitleRule
                as="h2"
                className="text-4xl md:text-5xl font-bold"
              >
                Created by Mothers, for Mothers
              </TitleRule>
              <p className="text-gray-700 leading-relaxed text-lg">
                Welcome to Mothership — where your nourishment comes first. As a mother I know how transformative the fourth trimester can be, and we're here to make it easier. Rooted in time-honored postpartum traditions, our chef-crafted frozen meals are designed to help your body recover, your energy return, and your heart feel supported. Every ingredient, every recipe, every delivery is made with the care only a mother could give — so you can rest, heal, and truly be cared for.
              </p>
              <Link href="/about" className="inline-flex items-center text-sage-green font-semibold hover:text-sage-700 transition-colors group">
                Read Our Story
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>

            <div className="mt-8 md:mt-0 md:w-1/2">
              <div className="relative h-72 w-full overflow-hidden rounded-3xl md:h-96 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80"
                  alt="Mother and baby"
                  fill
                  className="object-cover"
                />
                {/* Subtle overlay for image contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Modern card grid */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="mb-4 text-5xl font-bold text-sage-green">
              <TitleText>How It Works</TitleText>
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Three simple steps to nourish your postpartum journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                emoji: "❤️",
                title: "Choose Your Plan",
                description: "Select from our curated meal plans designed for postpartum nourishment and recovery",
                color: "from-pink-500 to-rose-600"
              },
              {
                icon: Flame,
                emoji: "🔥",
                title: "We Cook & Freeze",
                description: "Our meals are prepared fresh and flash-frozen to preserve nutrients and flavor",
                color: "from-orange-500 to-red-600"
              },
              {
                icon: Truck,
                emoji: "🚚",
                title: "Delivered to Your Door",
                description: "Receive your meals frozen, ready to heat and enjoy when you need them most",
                color: "from-sage-green to-sage-700"
              }
            ].map((step, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="h-full backdrop-blur-xl bg-white/80 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
                  {/* Icon container with gradient */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <span className="text-4xl">{step.emoji}</span>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-charcoal group-hover:text-sage-green transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Decorative element */}
                  <div className="absolute top-6 right-6 text-6xl font-bold text-sage-green/5 group-hover:text-sage-green/10 transition-colors">
                    0{index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sage-green to-sage-700 px-10 py-4 font-semibold text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Learn More
              <Sparkles className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages Section - Enhanced cards with quantity selectors */}
      <section className="px-4 py-20 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-5xl font-bold text-sage-green">
              <TitleText>Featured Meal Packages</TitleText>
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Choose from our most popular packages - crafted with love and ancient wisdom
            </p>
          </div>

          {/* Grid layout for better responsive design */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, index) => (
              <div
                key={pkg.id}
                className="group overflow-hidden rounded-3xl backdrop-blur-xl bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image with zoom effect */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Duration badge */}
                  <div className="absolute top-4 right-4">
                    <span className="backdrop-blur-xl bg-white/90 rounded-full px-4 py-2 text-sm font-semibold text-sage-green shadow-lg capitalize">
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Savings badge */}
                  {pkg.originalPrice && (
                    <div className="absolute top-4 left-4">
                      <span className="backdrop-blur-xl bg-sage-green/90 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg">
                        Save {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal group-hover:text-sage-green transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-sage-600 font-semibold mt-1">
                      {pkg.mealCount} meals
                    </p>
                  </div>
                  <p className="text-gray-700 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Benefits list */}
                  <div className="flex flex-wrap gap-2">
                    {pkg.benefits.slice(0, 2).map((benefit, i) => (
                      <span key={i} className="text-xs bg-sage-50 text-sage-700 px-3 py-1 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-3xl font-bold text-sage-green">
                          {formatPrice(pkg.price)}
                        </span>
                        {pkg.originalPrice && (
                          <span className="ml-2 text-lg text-gray-400 line-through">
                            {formatPrice(pkg.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-start gap-3">
                      <QuantitySelector
                        quantity={quantities[pkg.id] || 0}
                        onQuantityChange={(qty) => handleQuantityChange(pkg.id, qty)}
                        min={0}
                        max={10}
                      />
                      <button
                        onClick={() => handleAddToCart(pkg)}
                        disabled={!quantities[pkg.id] || quantities[pkg.id] === 0}
                        className="flex-none shrink-0 grow-0 w-[80px] h-[40px] rounded-full bg-gradient-to-r from-sage-green to-sage-700 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-md flex items-center justify-center"
                        style={{ flex: '0 0 auto', width: '80px', minWidth: '80px', maxWidth: '80px' }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 rounded-full border-2 border-sage-green px-10 py-4 font-semibold text-sage-green hover:bg-sage-green hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              View All Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Membership Section - Modern glass card */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sage-green via-sage-600 to-sage-700 p-10 md:p-12 text-white shadow-2xl">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="mb-8 flex items-start gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl shadow-xl">
                  <Star className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold mb-2 py-2">
                    <TitleText>Mothership Membership</TitleText>
                  </h3>
                  <p className="text-xl text-white/90">
                    Join our community for exclusive benefits
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  "10% off all meals",
                  "Digital postpartum resources",
                  "Early access to events & classes",
                  "Referral rewards program"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 backdrop-blur-xl bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/membership"
                className="inline-flex items-center gap-2 rounded-full bg-white py-4 px-8 font-semibold text-sage-green hover:bg-white/95 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl"
              >
                Learn More & Join
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Modern card design */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-5xl font-bold text-sage-green">
              <TitleText>What Mothers Say</TitleText>
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Real experiences from our amazing community
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="group h-full backdrop-blur-xl bg-white/90 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Quote mark decoration */}
                <div className="text-6xl text-sage-green/20 font-serif mb-4">&ldquo;</div>

                <p className="mb-6 text-gray-700 leading-relaxed italic">
                  {testimonial.quote}
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sage-green to-sage-700 font-bold text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-lg">
                      {testimonial.name}
                    </p>
                    {testimonial.title && (
                      <p className="text-sm text-gray-500">
                        {testimonial.title}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup Section - Modern glass effect */}
      <section className="relative px-4 py-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-sage-green via-sage-600 to-sage-700" />

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <div className="mb-8">
            <div className="inline-block p-4 rounded-full bg-white/20 backdrop-blur-xl mb-6">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="mb-4 text-5xl font-bold py-2">
              <TitleText>Stay Connected, Mama</TitleText>
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Sign up for postpartum nourishment tips and exclusive offers.
            </p>
          </div>

          <div className="relative mx-auto max-w-md">
            <div className="backdrop-blur-xl bg-white/20 rounded-full p-2 shadow-2xl border border-white/20">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full px-6 py-4 text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white bg-white"
                />
                <button className="rounded-full bg-gradient-to-r from-charcoal to-gray-800 px-8 py-4 font-semibold text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
