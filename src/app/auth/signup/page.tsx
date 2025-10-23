'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, User, Mail, Phone, Lock, Sparkles, Smartphone, MessageSquare, Shield, Check, Star, Crown } from 'lucide-react'
import { sendVerificationCode, verifyPhoneCode, claimValidationReward } from '@/lib/phone-validation'

type MembershipTier = 'basic' | 'premium' | 'vip'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [enable2FA, setEnable2FA] = useState(false)
  const [twoFAMethod, setTwoFAMethod] = useState<'app' | 'sms'>('app')
  const [membershipTier, setMembershipTier] = useState<MembershipTier>('basic')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [returnUrl, setReturnUrl] = useState<string | null>(null)

  // Phone validation states
  const [showPhoneValidation, setShowPhoneValidation] = useState(false)
  const [validationId, setValidationId] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [phoneValidationError, setPhoneValidationError] = useState('')
  const [phoneValidationLoading, setPhoneValidationLoading] = useState(false)
  const [phoneValidationSuccess, setPhoneValidationSuccess] = useState(false)
  const [rewardAmount, setRewardAmount] = useState(0)

  const { setUser, setIsAuthenticated } = useAppStore()
  const router = useRouter()

  // Get return URL from query params on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setReturnUrl(params.get('returnUrl'))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy')
      return
    }

    setLoading(true)

    // Mock signup - generate a user ID
    const mockUserId = `user_${Date.now()}`

    const newUser = {
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      username: formData.username,
      phone: formData.phone,
      isSubscribed: false,
      isMember: false,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    }

    setUser(newUser)
    setIsAuthenticated(true)
    setLoading(false)

    // If phone provided, show validation modal
    if (formData.phone.trim()) {
      await initiatePhoneValidation(mockUserId, formData.phone)
    } else {
      // Otherwise redirect immediately based on membership tier
      router.push(getRedirectUrl())
    }
  }

  const initiatePhoneValidation = async (userId: string, phone: string) => {
    setPhoneValidationLoading(true)
    const result = await sendVerificationCode(userId, phone)

    if (result.success) {
      setValidationId(result.validationId)
      setShowPhoneValidation(true)
      setPhoneValidationLoading(false)
    } else {
      setPhoneValidationError(result.error || 'Failed to send verification code')
      setPhoneValidationLoading(false)
      // Still redirect after a delay
      setTimeout(() => {
        router.push(returnUrl || '/')
      }, 2000)
    }
  }

  const handleVerifyCode = async () => {
    setPhoneValidationError('')
    setPhoneValidationLoading(true)

    const result = await verifyPhoneCode(validationId, verificationCode)

    if (result.success) {
      if (result.canClaimReward) {
        // Claim the reward
        const claimResult = await claimValidationReward(validationId)
        if (claimResult.success) {
          setRewardAmount(claimResult.rewardAmount || 0)
          setPhoneValidationSuccess(true)
        }
      } else {
        // Phone validated but reward already claimed
        setPhoneValidationError('Phone verified, but this number has already claimed the reward')
        setTimeout(() => {
          setShowPhoneValidation(false)
          router.push(returnUrl || '/')
        }, 3000)
      }
    } else {
      setPhoneValidationError(result.error || 'Invalid verification code')
    }

    setPhoneValidationLoading(false)
  }

  const getRedirectUrl = () => {
    if (returnUrl) return returnUrl

    // If premium or VIP, redirect to payment/checkout
    if (membershipTier === 'premium' || membershipTier === 'vip') {
      return `/checkout?membership=${membershipTier}`
    }

    // For basic (free), go straight to welcome page
    return '/welcome'
  }

  const handleSkipValidation = () => {
    setShowPhoneValidation(false)
    router.push(getRedirectUrl())
  }

  const handleContinueAfterValidation = () => {
    setShowPhoneValidation(false)
    router.push(getRedirectUrl())
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ backgroundColor: '#F9F6F1' }}>
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sage-green rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blush rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <Link href="/auth/login" className="inline-flex items-center gap-2 text-charcoal mb-8 hover:text-sage-green hover:translate-x-1 transition-all duration-300 backdrop-blur-xl bg-white/60 px-4 py-2 rounded-full shadow-lg">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold">Back</span>
        </Link>

        {/* Main Signup Card */}
        <div className="backdrop-blur-2xl bg-white/90 rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sage-green to-sage-700 mb-4 p-2">
              <Image
                src="/logo/monogram-white.png"
                alt="Mothership"
                width={48}
                height={48}
                className="object-contain w-full h-full"
              />
            </div>
            <h1 className="text-4xl font-bold text-sage-green mb-2 font-cedarville">
              Join Mothership
            </h1>
            <p className="text-gray-600 italic">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="backdrop-blur-xl bg-red-50/90 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm animate-fade-in-scale">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-sage-green" />
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
                maxLength={26}
                pattern="[a-zA-Z0-9_]{3,26}"
                title="Username must be 3-26 characters (letters, numbers, underscores only)"
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all bg-white shadow-sm"
              />
              <p className="text-xs text-gray-500 mt-1">3-26 characters, letters, numbers, and underscores only</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-sage-green" />
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all bg-white shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-sage-green" />
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all bg-white shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-sage-green" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all bg-white shadow-sm text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-sage-green" />
                Phone <span className="text-gray-400 text-xs">(Optional, get extra perks)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all bg-white shadow-sm"
              />
              <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Get $10 in rewards when you validate your phone number!
              </p>
            </div>

            {/* Membership Tier Selection */}
            <div className="backdrop-blur-xl bg-gradient-to-r from-sage-green/5 to-sage-700/5 rounded-2xl p-6 border border-sage-200">
              <h3 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-sage-green" />
                Choose Your Membership Level
              </h3>
              <div className="space-y-3">
                {/* Basic - Free */}
                <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  membershipTier === 'basic'
                    ? 'border-sage-green bg-sage-green/10'
                    : 'border-gray-200 hover:border-sage-300 bg-white'
                }`}>
                  <input
                    type="radio"
                    name="membershipTier"
                    value="basic"
                    checked={membershipTier === 'basic'}
                    onChange={(e) => setMembershipTier(e.target.value as MembershipTier)}
                    className="mt-1 w-4 h-4 text-sage-green focus:ring-sage-green"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-sage-green" />
                        <span className="font-semibold text-charcoal">Basic</span>
                      </div>
                      <span className="font-bold text-sage-green">FREE</span>
                    </div>
                    <p className="text-xs text-gray-600">Browse meals • Order individually • Newsletter access</p>
                  </div>
                </label>

                {/* Premium */}
                <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  membershipTier === 'premium'
                    ? 'border-sage-green bg-sage-green/10'
                    : 'border-gray-200 hover:border-sage-300 bg-white'
                }`}>
                  <input
                    type="radio"
                    name="membershipTier"
                    value="premium"
                    checked={membershipTier === 'premium'}
                    onChange={(e) => setMembershipTier(e.target.value as MembershipTier)}
                    className="mt-1 w-4 h-4 text-sage-green focus:ring-sage-green"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-sage-green" />
                        <span className="font-semibold text-charcoal">Premium</span>
                        <span className="text-xs bg-terracotta text-white px-2 py-0.5 rounded-full">Most Popular</span>
                      </div>
                      <span className="font-bold text-sage-green">$19.99<span className="text-xs text-gray-600">/mo</span></span>
                    </div>
                    <p className="text-xs text-gray-600">10% off all meals • Exclusive resources • Priority support</p>
                  </div>
                </label>

                {/* VIP */}
                <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  membershipTier === 'vip'
                    ? 'border-sage-green bg-sage-green/10'
                    : 'border-gray-200 hover:border-sage-300 bg-white'
                }`}>
                  <input
                    type="radio"
                    name="membershipTier"
                    value="vip"
                    checked={membershipTier === 'vip'}
                    onChange={(e) => setMembershipTier(e.target.value as MembershipTier)}
                    className="mt-1 w-4 h-4 text-sage-green focus:ring-sage-green"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-amber-600" />
                        <span className="font-semibold text-charcoal">VIP</span>
                      </div>
                      <span className="font-bold text-sage-green">$39.99<span className="text-xs text-gray-600">/mo</span></span>
                    </div>
                    <p className="text-xs text-gray-600">15% off all meals • 1-on-1 consultation • Exclusive VIP events</p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-sage-green" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                minLength={6}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-sage-green" />
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                minLength={6}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all bg-white shadow-sm"
              />
            </div>

            {/* 2FA Options */}
            <div className="backdrop-blur-xl bg-gradient-to-r from-sage-green/5 to-sage-700/5 rounded-2xl p-6 border border-sage-200">
              <div className="flex items-start gap-3 mb-4">
                <input
                  type="checkbox"
                  id="enable2fa"
                  checked={enable2FA}
                  onChange={(e) => setEnable2FA(e.target.checked)}
                  className="mt-1 w-5 h-5 text-sage-green rounded focus:ring-sage-green"
                />
                <div className="flex-1">
                  <label htmlFor="enable2fa" className="text-sm font-semibold text-charcoal leading-relaxed flex items-center gap-2">
                    <Shield className="w-4 h-4 text-sage-green" />
                    Enable Two-Factor Authentication (Recommended)
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account</p>
                </div>
              </div>

              {enable2FA && (
                <div className="ml-8 space-y-3 animate-fade-in-up">
                  <p className="text-sm text-charcoal font-medium mb-3">Choose your 2FA method:</p>

                  <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    twoFAMethod === 'app'
                      ? 'border-sage-green bg-sage-green/10'
                      : 'border-gray-200 hover:border-sage-300'
                  }`}>
                    <input
                      type="radio"
                      name="2faMethod"
                      value="app"
                      checked={twoFAMethod === 'app'}
                      onChange={(e) => setTwoFAMethod(e.target.value as 'app' | 'sms')}
                      className="mt-1 w-4 h-4 text-sage-green focus:ring-sage-green"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Smartphone className="w-4 h-4 text-sage-green" />
                        <span className="font-semibold text-charcoal">Authenticator App</span>
                      </div>
                      <p className="text-xs text-gray-600">Use Google Authenticator, Authy, or similar apps</p>
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    twoFAMethod === 'sms'
                      ? 'border-sage-green bg-sage-green/10'
                      : 'border-gray-200 hover:border-sage-300'
                  }`}>
                    <input
                      type="radio"
                      name="2faMethod"
                      value="sms"
                      checked={twoFAMethod === 'sms'}
                      onChange={(e) => setTwoFAMethod(e.target.value as 'app' | 'sms')}
                      className="mt-1 w-4 h-4 text-sage-green focus:ring-sage-green"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="w-4 h-4 text-sage-green" />
                        <span className="font-semibold text-charcoal">SMS Text Message</span>
                      </div>
                      <p className="text-xs text-gray-600">Receive codes via text to {formData.phone || 'your phone'}</p>
                    </div>
                  </label>
                </div>
              )}
            </div>

            <div className="backdrop-blur-xl bg-sage-green/5 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 text-sage-green rounded focus:ring-sage-green"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                  I agree to the{' '}
                  <Link href="/legal/terms" className="text-sage-green font-semibold hover:underline">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/legal/privacy" className="text-sage-green font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sage-green to-sage-700 text-white rounded-full py-4 font-semibold hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
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
            Already have an account?{' '}
            <Link href="/auth/login" className="text-sage-green font-semibold hover:underline hover:text-sage-700 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Phone Validation Modal */}
      {showPhoneValidation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-fade-in-scale">
            {!phoneValidationSuccess ? (
              <>
                {/* Verification Input */}
                <div className="text-center mb-6">
                  <div className="inline-block p-4 rounded-full bg-gradient-to-br from-sage-green to-sage-700 mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-charcoal mb-2">
                    Verify Your Phone
                  </h2>
                  <p className="text-gray-600 text-sm">
                    We&apos;ve sent a 6-digit code to<br />
                    <span className="font-semibold text-sage-green">{formData.phone}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Check your console for the verification code (SMS integration coming soon)
                  </p>
                </div>

                <div className="space-y-4">
                  {phoneValidationError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm animate-fade-in-scale">
                      {phoneValidationError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all bg-white shadow-sm text-center text-2xl tracking-widest font-mono"
                    />
                  </div>

                  <button
                    onClick={handleVerifyCode}
                    disabled={phoneValidationLoading || verificationCode.length !== 6}
                    className="w-full bg-gradient-to-r from-sage-green to-sage-700 text-white rounded-full py-4 font-semibold hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {phoneValidationLoading ? 'Verifying...' : 'Verify & Claim $10 Reward'}
                  </button>

                  <button
                    onClick={handleSkipValidation}
                    className="w-full text-gray-600 hover:text-charcoal py-3 font-medium transition-colors"
                  >
                    Skip for now
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center">
                  <div className="inline-block p-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 mb-4 animate-bounce-in">
                    <Check className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-charcoal mb-2">
                    Success!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your phone has been verified
                  </p>

                  <div className="bg-gradient-to-br from-green-50 to-sage-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="w-6 h-6 text-green-600" />
                      <span className="text-4xl font-bold text-green-600">
                        ${rewardAmount.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-green-700 font-semibold">
                      Added to your account!
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Use your rewards on your next order
                    </p>
                  </div>

                  <button
                    onClick={handleContinueAfterValidation}
                    className="w-full bg-gradient-to-r from-sage-green to-sage-700 text-white rounded-full py-4 font-semibold hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
