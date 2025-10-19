'use client'

import ProtectedRoute from '@/components/protected-route'
import PortalNav from '@/components/portal-nav'
import { BookOpen, Download, FileText, Video, Headphones } from 'lucide-react'

const resources = [
  {
    category: 'Guides',
    icon: BookOpen,
    items: [
      {
        title: 'Postpartum Nutrition Guide',
        description: 'Complete guide to nourishing your body after birth',
        type: 'PDF',
        size: '2.4 MB',
      },
      {
        title: 'Meal Prep Basics',
        description: 'Learn efficient meal prep strategies for new parents',
        type: 'PDF',
        size: '1.8 MB',
      },
      {
        title: 'Freezer Storage Guide',
        description: 'How to properly store and reheat your Mothership meals',
        type: 'PDF',
        size: '1.2 MB',
      },
    ],
  },
  {
    category: 'Videos',
    icon: Video,
    items: [
      {
        title: 'Welcome to Mothership',
        description: 'Getting started with your meal delivery service',
        type: 'Video',
        duration: '5:24',
      },
      {
        title: 'Meal Heating Tips',
        description: 'Best practices for reheating your meals',
        type: 'Video',
        duration: '3:15',
      },
    ],
  },
  {
    category: 'Recipes',
    icon: FileText,
    items: [
      {
        title: 'Bonus Recipe Collection',
        description: '20 quick postpartum-friendly recipes',
        type: 'PDF',
        size: '3.1 MB',
      },
      {
        title: 'Smoothie Recipe Book',
        description: 'Nutrient-dense smoothies for busy parents',
        type: 'PDF',
        size: '1.5 MB',
      },
    ],
  },
  {
    category: 'Audio',
    icon: Headphones,
    items: [
      {
        title: 'Mindful Eating Meditation',
        description: 'Guided meditation for mealtimes',
        type: 'Audio',
        duration: '10:00',
      },
      {
        title: 'Nutrition Podcast Series',
        description: 'Expert interviews on postpartum nutrition',
        type: 'Audio',
        duration: '45:30',
      },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-cream">
        <PortalNav />

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-charcoal mb-2">Digital Resources</h1>
            <p className="text-charcoal-70">
              Access exclusive guides, recipes, and educational content
            </p>
          </div>

          {/* Resource Categories */}
          <div className="space-y-6">
            {resources.map((category) => {
              const Icon = category.icon

              return (
                <div key={category.category} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-sage" />
                    </div>
                    <h2 className="text-2xl font-bold text-charcoal">{category.category}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between p-4 bg-cream rounded-2xl hover:bg-sage/5 transition-colors group"
                      >
                        <div className="flex-1">
                          <h3 className="font-bold text-charcoal mb-1">{item.title}</h3>
                          <p className="text-sm text-charcoal-70 mb-2">{item.description}</p>
                          <div className="flex items-center gap-3 text-xs text-charcoal-60">
                            <span className="bg-white px-2 py-1 rounded">{item.type}</span>
                            {'size' in item && <span>{item.size}</span>}
                            {'duration' in item && <span>{item.duration}</span>}
                          </div>
                        </div>
                        <button className="ml-4 p-2 text-sage hover:bg-sage/10 rounded-lg transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Member Exclusive Banner */}
          <div className="mt-8 bg-gradient-to-br from-sage to-sage-600 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Member Exclusive Content</h2>
            <p className="text-white/90 mb-4">
              New resources are added monthly. Check back regularly for updates!
            </p>
            <button className="bg-white text-sage px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-shadow">
              Request a Resource
            </button>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
