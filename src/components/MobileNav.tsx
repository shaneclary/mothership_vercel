'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Utensils, Package, Search, User, ShoppingCart, Menu } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '@/lib/store'

export default function MobileNav() {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)
  const { cartItems } = useAppStore()
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const navItems = [
    { href: '/about', icon: Heart, label: 'About' },
    { href: '/meals', icon: Utensils, label: 'Meals' },
    { href: '/packages', icon: Package, label: 'Packages' },
    { href: '/search', icon: Search, label: 'Search' },
    { href: '/portal', icon: User, label: 'Portal' },
    { href: '/cart', icon: ShoppingCart, label: 'Cart', badge: cartCount },
    { href: '#', icon: Menu, label: 'Menu', onClick: () => setShowMenu(!showMenu) },
  ]

  return (
    <>
      {/* Bottom Navigation - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={item.onClick}
                className={`flex flex-col items-center justify-center min-w-[48px] py-1 px-1 rounded-lg transition-colors ${
                  isActive
                    ? 'text-sage-green'
                    : 'text-gray-600 hover:text-sage-green'
                }`}
              >
                <div className="relative">
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-terracotta text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs mt-0.5 ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Menu Overlay */}
      {showMenu && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-[60]" onClick={() => setShowMenu(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl animate-slide-up max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-charcoal">Menu</h3>
                <button
                  onClick={() => setShowMenu(false)}
                  className="text-gray-500 hover:text-charcoal"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="px-4 py-2">
              <Link
                href="/contact"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-sage-green/10 transition-colors"
              >
                <div className="w-10 h-10 bg-sage-green/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-sage-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-charcoal">Contact Us</p>
                  <p className="text-sm text-gray-600">Get in touch</p>
                </div>
              </Link>

              {/* Placeholder for future pages */}
              <div className="mt-4 px-4 py-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Coming Soon
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-gray-50 opacity-50">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-400">Farm Partners</p>
                      <p className="text-sm text-gray-400">Meet our farmers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom padding for safe area */}
            <div className="h-20"></div>
          </div>
        </div>
      )}

      {/* Add bottom padding to main content to prevent overlap */}
      <style jsx global>{`
        @media (max-width: 768px) {
          body {
            padding-bottom: 70px;
          }
        }
      `}</style>
    </>
  )
}
