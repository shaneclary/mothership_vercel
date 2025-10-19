'use client'

import ProtectedRoute from '@/components/protected-route'
import PortalNav from '@/components/portal-nav'
import Link from 'next/link'
import { BookOpen, Calendar, Gift, Settings, ArrowRight } from 'lucide-react'

export default function MorePage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-cream">
        <PortalNav />

        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-charcoal mb-8">More</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/portal/resources"
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-charcoal mb-1">Resources</h3>
                    <p className="text-sm text-charcoal-70">Guides and education</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-sage group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/portal/events"
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-charcoal mb-1">Events & Classes</h3>
                    <p className="text-sm text-charcoal-70">Workshops and community events</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-sage group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/portal/perks"
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Gift className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-charcoal mb-1">Perks & Offers</h3>
                    <p className="text-sm text-charcoal-70">Member benefits and rewards</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-sage group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/portal/settings"
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Settings className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-charcoal mb-1">Settings</h3>
                    <p className="text-sm text-charcoal-70">Account and preferences</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-sage group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
