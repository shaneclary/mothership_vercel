'use client';
import { useState, useMemo } from 'react';
import { meals } from '@/lib/data';
import Header from '@/components/Header';
import MealCard from '@/components/MealCard';
import CartProgress from '@/components/CartProgress';

const categories = [
  { id: 'all', label: 'All Meals', type: null },
  { id: 'soups', label: 'Soups', type: 'soup' },
  { id: 'broths', label: 'Broths', type: 'broth' },
  { id: 'full-meals', label: 'Full Meals', type: 'full-meal' },
];

export default function MealsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeals = useMemo(() => {
    let filtered = meals;

    // Filter by category
    if (selectedCategory !== 'all') {
      const category = categories.find(c => c.id === selectedCategory);
      if (category?.type) {
        filtered = filtered.filter(meal => meal.type === category.type);
      }
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(meal =>
        meal.name.toLowerCase().includes(query) ||
        meal.description.toLowerCase().includes(query) ||
        meal.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Header />
      <CartProgress />

      <div className="min-h-screen bg-cream">
        <div className="bg-white px-4 py-4 border-b">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search meals... (5 minimum to order)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sage-green"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full flex-shrink-0 transition ${
                  selectedCategory === cat.id
                    ? 'bg-sage-green text-white'
                    : 'bg-white text-charcoal border border-gray-300 hover:border-sage-green'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="bg-sage-green bg-opacity-10 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <span className="text-2xl">🍽️</span>
            <p className="text-sm text-gray-700">
              <span className="font-bold">{filteredMeals.length} meals found</span> • 5-meal minimum to checkout
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.map(meal => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>

          {filteredMeals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No meals found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
