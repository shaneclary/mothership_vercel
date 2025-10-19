'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, ShoppingBag, CheckCircle, Star, Package } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { mockMealPackages } from '@/lib/mock-data'
import { useAppStore } from '@/lib/store'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { useState } from 'react'
import Link from 'next/link'

export default function PackageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useAppStore()
  const [showSuccess, setShowSuccess] = useState(false)

  const pkg = mockMealPackages.find(p => p.id === params.id)

  if (!pkg) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Package Not Found</h1>
          <Link href="/packages" className="text-sage hover:text-sage-600 font-semibold">
            ← Back to Packages
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      image: pkg.image,
      description: pkg.description,
      type: 'package',
      mealIds: pkg.meals,
      mealCount: pkg.mealCount
    })
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-charcoal hover:text-sage mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Packages</span>
        </button>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Package added to cart successfully!</span>
            <Link href="/cart" className="ml-auto text-green-600 hover:text-green-700 font-semibold">
              View Cart →
            </Link>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-lg">
              <Image
                src={pkg.image}
                alt={pkg.name}
                fill
                className="object-cover"
                priority
              />
              {pkg.isPopular && (
                <div className="absolute top-4 left-4 bg-terracotta text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  Most Popular
                </div>
              )}
              {pkg.originalPrice > pkg.price && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  Save {calculateDiscount(pkg.originalPrice, pkg.price)}%
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {pkg.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-dusty-rose/20 text-dusty-rose rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="text-4xl font-bold text-charcoal mb-3">{pkg.name}</h1>
              <div className="flex items-baseline gap-3">
                <div className="text-3xl font-bold text-sage">{formatPrice(pkg.price)}</div>
                {pkg.originalPrice > pkg.price && (
                  <div className="text-xl text-gray-500 line-through">{formatPrice(pkg.originalPrice)}</div>
                )}
              </div>
              <div className="text-charcoal-60 mt-2">
                {formatPrice(pkg.price / pkg.mealCount)} per meal
              </div>
            </div>

            {/* Package Info */}
            <div className="bg-blush/30 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-charcoal-60 mb-1">
                    <Package className="w-4 h-4" />
                    <span className="text-sm">Meal Count</span>
                  </div>
                  <div className="text-2xl font-bold text-charcoal">{pkg.mealCount} meals</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-charcoal-60 mb-1">
                    <Package className="w-4 h-4" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <div className="text-2xl font-bold text-charcoal">{pkg.duration}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-lg">
              <p className="text-charcoal-70 leading-relaxed">{pkg.description}</p>
            </div>

            {/* Benefits */}
            {pkg.benefits && pkg.benefits.length > 0 && (
              <div>
                <h3 className="font-bold text-charcoal mb-4">Package Includes:</h3>
                <ul className="space-y-2">
                  {pkg.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-charcoal-70">
                      <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart */}
            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={handleAddToCart}
                className="w-full bg-sage hover:bg-sage-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" />
                Add Package to Cart
              </button>
              <p className="text-center text-sm text-charcoal-60 mt-3">
                Free shipping on all packages • Cancel anytime
              </p>
            </div>
          </div>
        </div>

        {/* What's Inside */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-charcoal mb-8">What&apos;s Inside This Package</h2>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="prose prose-lg max-w-none">
              <p className="text-charcoal-70 leading-relaxed mb-6">
                This carefully curated package includes {pkg.mealCount} nourishing meals specifically designed for postpartum recovery.
                Each meal is flash-frozen at peak freshness and delivered to your door.
              </p>

              {pkg.benefits && pkg.benefits.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {pkg.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-cream rounded-xl">
                      <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal-70">{benefit}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Why This Package */}
        <div className="mt-16 bg-gradient-to-br from-sage to-sage-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">Why Choose This Package?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="font-bold text-xl mb-2">Curated by Experts</h3>
              <p className="text-white/90">
                Selected by our nutritionist and chef Monika Knapp for optimal postpartum recovery
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">💚</div>
              <h3 className="font-bold text-xl mb-2">Nutrient Dense</h3>
              <p className="text-white/90">
                Packed with vitamins, minerals, and healing compounds your body needs
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="font-bold text-xl mb-2">Zero Prep Time</h3>
              <p className="text-white/90">
                Simply heat and eat - perfect for sleep-deprived new mothers
              </p>
            </div>
          </div>
        </div>

        {/* Other Packages */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-charcoal mb-8">Other Packages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockMealPackages
              .filter(p => p.id !== pkg.id)
              .slice(0, 3)
              .map(otherPkg => (
                <Link
                  key={otherPkg.id}
                  href={`/packages/${otherPkg.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={otherPkg.image}
                      alt={otherPkg.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {otherPkg.isPopular && (
                      <div className="absolute top-4 left-4 bg-terracotta text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Popular
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-charcoal mb-2">{otherPkg.name}</h3>
                    <p className="text-charcoal-70 text-sm line-clamp-2 mb-3">{otherPkg.description}</p>
                    <div className="flex items-baseline gap-2">
                      <div className="text-sage font-bold text-xl">{formatPrice(otherPkg.price)}</div>
                      {otherPkg.originalPrice > otherPkg.price && (
                        <div className="text-gray-500 line-through text-sm">{formatPrice(otherPkg.originalPrice)}</div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
