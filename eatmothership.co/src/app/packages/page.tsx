'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Package, Star, CheckCircle, ArrowRight } from 'lucide-react'
import { mockMealPackages, MealPackage } from '@/lib/mock-data'
import { useAppStore } from '@/lib/store'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function PackagesPage() {
  const { addToCart } = useAppStore()

  const handleAddPackage = (pkg: MealPackage) => {
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
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-cedarville text-4xl text-charcoal mb-4">
            Meal Packages
          </h1>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Curated collections designed to support your postpartum journey with the perfect balance of nourishment and convenience.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockMealPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              {/* Package Image */}
              <div className="relative">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                {pkg.isPopular && (
                  <div className="absolute top-4 left-4 bg-terracotta text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Most Popular
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 text-charcoal px-2 py-1 rounded-full text-sm font-semibold">
                  {pkg.mealCount} meals
                </div>
              </div>

              {/* Package Content */}
              <div className="p-6">
                <h3 className="font-semibold text-xl text-charcoal mb-2">
                  {pkg.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {pkg.description}
                </p>

                {/* Duration and Benefits */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-charcoal/70">
                    <Package className="w-4 h-4 mr-2" />
                    <span>{pkg.duration} • {pkg.mealCount} meals</span>
                  </div>
                  
                  <div className="space-y-1">
                    {pkg.benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="flex items-center text-sm text-charcoal/70">
                        <CheckCircle className="w-3 h-3 mr-2 text-sage" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-sage">
                      {formatPrice(pkg.price)}
                    </span>
                    {pkg.originalPrice > pkg.price && (
                      <>
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(pkg.originalPrice)}
                        </span>
                        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                          Save {calculateDiscount(pkg.originalPrice, pkg.price)}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-charcoal/60 mt-1">
                    {formatPrice(pkg.price / pkg.mealCount)} per meal
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleAddPackage(pkg)}
                    className="w-full bg-sage hover:bg-sage/80 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Add to Cart
                  </button>
                  
                  <Link
                    href={`/packages/${pkg.id}`}
                    className="w-full flex items-center justify-center text-sage hover:text-sage/80 font-semibold py-3 px-6 rounded-lg border border-sage hover:bg-sage/5 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-4">
                  {pkg.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-dusty-rose/20 text-dusty-rose text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Package CTA */}
        <div className="mt-12 rounded-2xl p-8 text-center shadow-lg bg-gradient-to-b from-[#9db09a] to-[#d4b8a4]">
          <Package className="w-12 h-12 mx-auto mb-4 text-white" />
          <h2 className="font-cedarville text-3xl mb-4 text-white py-2">
            Build Your Own Package
          </h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Create a custom package with your favorite meals. Choose any 5+ meals and automatically save on bulk pricing.
          </p>
          <div className="flex items-center justify-center gap-6 text-white/90 text-sm mb-6">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>5+ meals: 5% off</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>8+ meals: 10% off</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>13+ meals: 15% off</span>
            </div>
          </div>
          <Link
            href="/meals"
            className="bg-white text-sage hover:bg-white/90 px-8 py-4 rounded-full font-semibold text-lg transition-colors inline-flex items-center"
          >
            <Package className="w-5 h-5 mr-2" />
            Start Building
          </Link>
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <h2 className="font-cedarville text-3xl text-charcoal text-center mb-8">
            Why Choose Our Packages?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Curated Selection",
                description: "Each package is carefully designed by nutritionists and postpartum specialists"
              },
              {
                icon: Star,
                title: "Best Value",
                description: "Save up to 15% compared to buying individual meals"
              },
              {
                icon: Package,
                title: "Convenience",
                description: "Everything you need delivered together, perfectly portioned"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-sage/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-sage" />
                </div>
                <h3 className="font-semibold text-xl text-charcoal mb-3">
                  {benefit.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

