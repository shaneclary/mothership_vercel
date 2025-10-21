'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Mail, Lock, Info } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser, setIsAuthenticated } = useAppStore()
  const router = useRouter()

  const fillDemo = () => {
    setEmail('demo@mothership.com')
    setPassword('demo123')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Mock login - in production would call API
    if (email === 'demo@mothership.com' && password === 'demo123') {
      const demoUser = {
        email: 'demo@mothership.com',
        name: 'Sarah Johnson',
        firstName: 'Sarah',
        username: 'sarah_j', // @username for tagging
        isSubscribed: true,
        isMember: true,
        memberSince: 'January 2024',
        subscription: {
          status: 'active',
          nextDelivery: 'Wednesday, Oct 22',
          mealPlanSize: 12,
          totalSavings: 247.50,
          orders: 12,
          dayStreak: 45
        }
      }
      setUser(demoUser)
      setIsAuthenticated(true)
      router.push('/portal')
    } else {
      setError('Invalid credentials')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ backgroundColor: '#F9F6F1' }}>
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sage-green rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blush rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <Link href="/" className="inline-flex items-center gap-2 text-charcoal mb-8 hover:text-sage-green hover:translate-x-1 transition-all duration-300 backdrop-blur-xl bg-white/60 px-4 py-2 rounded-full shadow-lg">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold">Back</span>
        </Link>

        {/* Main Login Card */}
        <div className="backdrop-blur-2xl bg-white/90 rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6">
              <Image
                src="/logo/brandmark.png"
                alt="Mothership"
                width={260}
                height={80}
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold text-sage-green mb-2 font-cedarville">
              Welcome Back
            </h1>
            <p className="text-gray-600 italic">Sign in to access your Mothership Portal</p>
          </div>

          {/* Demo Account Info */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-sage-green/10 to-sage-green/5 rounded-2xl p-6 mb-6 border border-sage-green/20 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-green to-sage-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-charcoal mb-1">Demo Account</h3>
                <p className="text-sm text-gray-600">Try the Mothership Portal with our demo account</p>
              </div>
            </div>
            <button
              onClick={fillDemo}
              type="button"
              className="w-full backdrop-blur-xl bg-sage-green/20 text-sage-green rounded-full py-3 font-semibold hover:bg-sage-green hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
            >
              Fill Demo Credentials
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="backdrop-blur-xl bg-red-50/90 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm animate-fade-in-scale">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-sage-green" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all bg-white shadow-sm text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-sage-green" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all bg-white shadow-sm text-lg"
              />
            </div>

            <div className="text-right">
              <Link href="/auth/forgot-password" className="text-sm text-gray-500 hover:text-sage-green hover:underline transition-colors">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sage-green to-sage-700 text-white rounded-full py-4 font-semibold mt-6 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 backdrop-blur-xl bg-white/90 text-gray-500 font-medium rounded-full">or</span>
            </div>
          </div>

          <p className="text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-sage-green font-semibold hover:underline hover:text-sage-700 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
