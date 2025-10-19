'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Plus, Minus, ShoppingBag, CheckCircle } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { mockMeals } from '@/lib/mock-data'
import { useAppStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'
import Link from 'next/link'

export default function MealDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useAppStore()
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  const meal = mockMeals.find(m => m.id === params.id)

  if (!meal) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Meal Not Found</h1>
          <Link href="/meals" className="text-sage hover:text-sage-600 font-semibold">
            ← Back to Meals
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: meal.id,
        name: meal.name,
        price: meal.price,
        image: meal.image,
        description: meal.description,
        type: 'meal',
        mealCount: 1
      })
    }
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
          <span className="font-medium">Back to Meals</span>
        </button>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Added to cart successfully!</span>
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
                src={meal.image}
                alt={meal.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {meal.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-sage/10 text-sage rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="text-4xl font-bold text-charcoal mb-3">{meal.name}</h1>
              <div className="text-3xl font-bold text-sage">{formatPrice(meal.price)}</div>
            </div>

            {/* Description */}
            <div className="prose prose-lg">
              <p className="text-charcoal-70 leading-relaxed">{meal.description}</p>
            </div>

            {/* Benefits */}
            {meal.benefits && meal.benefits.length > 0 && (
              <div className="bg-blush/30 rounded-2xl p-6">
                <h3 className="font-bold text-charcoal mb-4">Postpartum Benefits:</h3>
                <ul className="space-y-2">
                  {meal.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-charcoal-70">
                      <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients */}
            {meal.ingredients && meal.ingredients.length > 0 && (
              <div>
                <h3 className="font-bold text-charcoal mb-3">Key Ingredients:</h3>
                <div className="flex flex-wrap gap-2">
                  {meal.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-charcoal-70"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Nutrition Info */}
            {meal.nutritionInfo && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-charcoal mb-4">Nutrition Information:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-sage">{meal.nutritionInfo.calories}</div>
                    <div className="text-sm text-charcoal-60">Calories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-sage">{meal.nutritionInfo.protein}g</div>
                    <div className="text-sm text-charcoal-60">Protein</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-sage">{meal.nutritionInfo.carbs}g</div>
                    <div className="text-sm text-charcoal-60">Carbs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-sage">{meal.nutritionInfo.fat}g</div>
                    <div className="text-sm text-charcoal-60">Fat</div>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-charcoal">Quantity:</span>
                <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-sage hover:bg-sage-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart - {formatPrice(meal.price * quantity)}
              </button>
            </div>
          </div>
        </div>

        {/* Related Meals */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-charcoal mb-8">You Might Also Like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockMeals
              .filter(m => m.id !== meal.id)
              .slice(0, 3)
              .map(relatedMeal => (
                <Link
                  key={relatedMeal.id}
                  href={`/meals/${relatedMeal.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={relatedMeal.image}
                      alt={relatedMeal.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-charcoal mb-2">{relatedMeal.name}</h3>
                    <p className="text-charcoal-70 text-sm line-clamp-2 mb-3">{relatedMeal.description}</p>
                    <div className="text-sage font-bold text-xl">{formatPrice(relatedMeal.price)}</div>
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
