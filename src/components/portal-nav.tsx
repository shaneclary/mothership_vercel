'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Home, CreditCard, ShoppingBag, MessageCircle, HelpCircle, LogOut, Calendar, Gift, BookOpen, Settings, Award, Mail } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import PortalMobileNav from './PortalMobileNav'

const navItems = [
  { href: '/portal', label: 'Dashboard', icon: Home },
  { href: '/portal/subscription', label: 'My Plan', icon: CreditCard },
  { href: '/portal/meals', label: 'Store', icon: ShoppingBag },
  { href: '/portal/community', label: 'Community', icon: MessageCircle },
  { href: '/portal/messages', label: 'Messages', icon: Mail },
  { href: '/portal/ask-expert', label: 'Ask Expert', icon: HelpCircle },
  { href: '/portal/events', label: 'Events', icon: Calendar },
  { href: '/portal/perks', label: 'Perks', icon: Gift },
  { href: '/portal/rewards', label: 'Rewards', icon: Award },
  { href: '/portal/resources', label: 'Resources', icon: BookOpen },
  { href: '/portal/settings', label: 'Settings', icon: Settings },
]

export default function PortalNav() {
  const pathname = usePathname()
  const router = useRouter()
  const setIsAuthenticated = useAppStore((state) => state.setIsAuthenticated)
  const setUser = useAppStore((state) => state.setUser)

  const handleLogout = () => {
    // Redirect first, then clear auth to avoid protected route intercepting
    router.push('/')
    // Use setTimeout to ensure navigation starts before clearing auth
    setTimeout(() => {
      setIsAuthenticated(false)
      setUser(null)
    }, 100)
  }

  return (
    <>
      {/* Desktop Sidebar - Hidden on Mobile */}
      <nav className="hidden md:block backdrop-blur-xl bg-white/90 border-r border-sage-green/10 w-64 min-h-screen p-6 shadow-xl">
        <div className="mb-8">
          <Link href="/" className="flex items-center group">
            <div className="h-12 w-12 relative transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo/heart_ring_1.png"
                alt="Mothership"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-sage-green to-sage-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                    : 'text-charcoal hover:bg-sage-green/10 hover:scale-105 active:scale-95 backdrop-blur-xl'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-sage-green/20">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-charcoal hover:bg-red-50 hover:text-red-600 hover:scale-105 active:scale-95 transition-all duration-300 w-full backdrop-blur-xl"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <PortalMobileNav />
    </>
  )
}
