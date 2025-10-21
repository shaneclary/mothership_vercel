'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Home, CreditCard, ShoppingBag, Calendar, Gift, Menu, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '@/lib/store'

export default function PortalMobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const setIsAuthenticated = useAppStore((state) => state.setIsAuthenticated)
  const setUser = useAppStore((state) => state.setUser)

  const handleLogout = () => {
    router.push('/')
    setTimeout(() => {
      setIsAuthenticated(false)
      setUser(null)
    }, 100)
  }

  const navItems = [
    { href: '/portal', icon: Home, label: 'Home' },
    { href: '/portal/subscription', icon: CreditCard, label: 'My Plan' },
    { href: '/portal/meals', icon: ShoppingBag, label: 'Store' },
    { href: '/portal/events', icon: Calendar, label: 'Events' },
    { href: '/portal/perks', icon: Gift, label: 'Perks' },
    { href: '#', icon: Menu, label: 'More', onClick: () => setShowMenu(!showMenu) },
  ]

  const moreMenuItems = [
    { href: '/portal/community', label: 'Community', description: 'Connect with others' },
    { href: '/portal/messages', label: 'Messages', description: 'Your inbox' },
    { href: '/portal/ask-expert', label: 'Ask Expert', description: 'Get advice' },
    { href: '/portal/rewards', label: 'Rewards', description: 'Track your points' },
    { href: '/portal/resources', label: 'Resources', description: 'Guides & recipes' },
    { href: '/portal/settings', label: 'Settings', description: 'Account settings' },
  ]

  return (
    <>
      {/* Mobile Header - Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-sage-green/20 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/portal" className="flex items-center">
            <div className="h-8 w-auto relative">
              <Image
                src="/logo/brandmark.png"
                alt="Mothership"
                width={120}
                height={30}
                className="object-contain"
              />
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-charcoal hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </header>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-sage-green/20 z-50 safe-area-bottom">
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
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-xs mt-0.5 ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* More Menu Overlay */}
      {showMenu && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-[60]" onClick={() => setShowMenu(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl animate-slide-up max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-charcoal">More</h3>
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
              {moreMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-sage-green/10 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-charcoal">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
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
