import Link from 'next/link'
import { Instagram, Facebook, Twitter, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-charcoal via-gray-900 to-charcoal text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sage-green rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sage-green rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-sage-green to-sage-700 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="font-cedarville text-2xl bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                Mothership
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Nourishing new mothers with wholesome, frozen meals inspired by ancient postpartum care traditions.
            </p>
            {/* Newsletter signup in footer */}
            <div className="pt-2">
              <p className="text-sm font-semibold mb-3 text-white/90">Stay Connected</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-sage-green transition-all"
                />
                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-sage-green to-sage-700 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg text-sm font-semibold whitespace-nowrap">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/meals', label: 'Shop Meals' },
                { href: '/packages', label: 'Meal Packages' },
                { href: '/membership', label: 'Join' },
                { href: '/about', label: 'Our Story' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-sage-green transition-all duration-300 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-6 text-white">Support</h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/faq', label: 'FAQ' },
                { href: '/shipping', label: 'Shipping Info' },
                { href: '/returns', label: 'Returns' },
                { href: '/privacy', label: 'Privacy Policy' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-sage-green transition-all duration-300 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-6 text-white">Connect With Us</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Join our community of mothers supporting mothers.
            </p>
            <div className="flex space-x-3">
              {[
                { href: 'https://instagram.com', Icon: Instagram, label: 'Instagram' },
                { href: 'https://facebook.com', Icon: Facebook, label: 'Facebook' },
                { href: 'https://twitter.com', Icon: Twitter, label: 'Twitter' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 backdrop-blur-xl bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-sage-green hover:to-sage-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-2">
            &copy; 2024 Mothership. All rights reserved. Made with{' '}
            <Heart className="w-4 h-4 text-sage-green animate-pulse" /> for mothers everywhere.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { href: '/terms', label: 'Terms of Service' },
              { href: '/privacy', label: 'Privacy Policy' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
