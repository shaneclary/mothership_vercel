'use client'

import { useState } from 'react'
import { Search, Filter, Sparkles, ShoppingBag } from 'lucide-react'
import { mockMeals } from '@/lib/mock-data'
import { useAppStore } from '@/lib/store'
import Header from '@/components/header'
import Footer from '@/components/footer'
import MealCard from '@/components/meal-card'
import ProgressIndicator from '@/components/progress-indicator'

export default function MealsPage() {
  const {
    selectedFilter,
    setSelectedFilter,
    searchQuery,
    setSearchQuery,
    getTotalMeals
  } = useAppStore()

  const [showFilters, setShowFilters] = useState(false)

  const filters = [
    { id: "all", label: "All Meals", count: mockMeals.length, icon: "🍽️" },
    { id: "soup", label: "Soups", count: mockMeals.filter(m => m.category === "soup").length, icon: "🍲" },
    { id: "broth", label: "Broths", count: mockMeals.filter(m => m.category === "broth").length, icon: "🥣" },
    { id: "full-meal", label: "Full Meals", count: mockMeals.filter(m => m.category === "full-meal").length, icon: "🍱" },
  ]

  const filteredMeals = mockMeals.filter(meal => {
    const matchesFilter = selectedFilter === "all" || meal.category === selectedFilter
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meal.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalMeals = getTotalMeals()

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F6F1' }}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header - Enhanced with gradients */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center backdrop-blur-xl bg-sage-green/10 border border-sage-green/20 px-6 py-3 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-5 h-5 text-sage-green mr-2 animate-pulse" />
            <span className="text-sage-green font-semibold text-sm uppercase tracking-wider">All Meals</span>
          </div>
          <h1 className="font-cedarville text-6xl md:text-7xl text-sage-green mb-6">
            Nourishing Meals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Carefully crafted meals designed to support your postpartum recovery with traditional healing wisdom and modern nutrition science.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <ProgressIndicator />
        </div>

        {/* Tiered Discount Info */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-terracotta to-red-600 p-8 mb-8 text-white shadow-2xl animate-fade-in-scale">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Save More When You Order More</h3>
              <p className="text-white/90 text-lg">
                Choose individual meals or check out our pre-made packages
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 text-center border border-white/20">
                <div className="text-3xl font-bold mb-1">5-9 meals</div>
                <div className="text-white/90">Regular Price</div>
              </div>
              <div className="backdrop-blur-xl bg-white/20 rounded-2xl p-6 text-center border-2 border-white/40 transform md:scale-105">
                <div className="text-3xl font-bold mb-1">10-19 meals</div>
                <div className="text-white/90">Save 10%</div>
              </div>
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 text-center border border-white/20">
                <div className="text-3xl font-bold mb-1">20+ meals</div>
                <div className="text-white/90">Save 15%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters - Modern glassmorphism */}
        <div className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-xl border border-white/20 p-6 md:p-8 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search meals... (5 minimum to order)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all bg-white shadow-sm text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:scale-110 transition-all active:scale-95"
              >
                <span className="text-xl">✕</span>
              </button>
            )}
          </div>

          {/* Filter Pills - Modern animated design */}
          <div className="flex flex-wrap gap-3">
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`group px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 ${
                  selectedFilter === filter.id
                    ? "bg-gradient-to-r from-sage-green to-sage-700 text-white"
                    : "backdrop-blur-xl bg-white/60 hover:bg-white/80 text-charcoal border border-gray-200"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-xl">{filter.icon}</span>
                <span>{filter.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  selectedFilter === filter.id
                    ? "bg-white/20"
                    : "bg-sage-green/10 text-sage-green"
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Info - Modern design */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="backdrop-blur-xl bg-white/60 px-6 py-3 rounded-2xl shadow-lg border border-white/20">
            <p className="text-charcoal font-medium">
              <span className="text-2xl font-bold text-sage-green">{filteredMeals.length}</span>{' '}
              {filteredMeals.length === 1 ? 'meal' : 'meals'} found
              {totalMeals > 0 && (
                <span className="ml-3 text-gray-600">
                  • <span className="font-bold text-sage-green">{totalMeals}</span> of 5 selected
                </span>
              )}
            </p>
          </div>

          {totalMeals >= 5 && (
            <div className="backdrop-blur-xl bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg flex items-center gap-2 animate-fade-in-scale">
              <span className="text-xl">✓</span>
              Ready to checkout!
            </div>
          )}
        </div>

        {/* Meals Grid */}
        {filteredMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredMeals.map((meal, index) => (
              <div
                key={meal.id}
                className="animate-fade-in-scale"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MealCard meal={meal} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-12 max-w-md mx-auto shadow-xl border border-white/20">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-3">
                No meals found
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedFilter('all')
                }}
                className="bg-gradient-to-r from-sage-green to-sage-700 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Sticky Bottom Bar for Mobile - Modern design */}
        {totalMeals > 0 && totalMeals < 5 && (
          <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/90 border-t border-gray-200 p-4 md:hidden z-40 shadow-2xl">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div>
                <p className="font-bold text-charcoal text-lg">
                  {totalMeals} of 5 meals
                </p>
                <p className="text-sm text-gray-600">
                  Add {5 - totalMeals} more to checkout
                </p>
              </div>
              <button className="bg-gradient-to-r from-terracotta to-red-600 text-white px-5 py-3 rounded-full font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Cart
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
