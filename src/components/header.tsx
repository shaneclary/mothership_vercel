'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const getTotalMeals = useAppStore((state) => state.getTotalMeals)
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)

  const cartItemCount = getTotalMeals()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="backdrop-blur-xl bg-white/80 border-b border-sage-green/10 sticky top-0 z-50 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center group">
            <div className="h-[72px] w-[72px] relative transform group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
              <Image
                src="/logo/mothership-logo.png"
                alt="Mothership"
                width={72}
                height={72}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { href: '/meals', label: 'Meals' },
              { href: '/packages', label: 'Packages' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-charcoal font-medium hover:text-sage-green transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-sage-green to-sage-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <button className="p-3 text-charcoal hover:text-sage-green transition-colors duration-300 rounded-full hover:bg-sage-green/10 active:scale-95">
              <Search className="w-5 h-5" />
            </button>

            {/* User Account */}
            {isAuthenticated ? (
              <Link
                href="/portal"
                className="p-3 text-charcoal hover:text-sage-green transition-colors duration-300 rounded-full hover:bg-sage-green/10 active:scale-95"
                title="Members"
              >
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="p-3 text-charcoal hover:text-sage-green transition-colors duration-300 rounded-full hover:bg-sage-green/10 active:scale-95"
                title="Sign In"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-3 text-charcoal hover:text-sage-green transition-all duration-300 rounded-full hover:bg-sage-green/10 active:scale-95 group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {mounted && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-terracotta to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-scale-in">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-3 text-charcoal hover:text-sage-green transition-colors duration-300 rounded-full hover:bg-sage-green/10 active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation with smooth slide-in animation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-sage-green/10 py-6 animate-slide-up">
            <nav className="flex flex-col space-y-1">
              {[
                { href: '/meals', label: 'Meals' },
                { href: '/packages', label: 'Packages' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-charcoal font-medium hover:text-sage-green hover:bg-sage-green/10 rounded-xl transition-all duration-300 hover:translate-x-2"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
