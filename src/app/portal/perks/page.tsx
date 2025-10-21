'use client'

import ProtectedRoute from '@/components/protected-route'
import PortalNav from '@/components/portal-nav'
import { useAppStore } from '@/lib/store'
import { Gift, Share2, Award, Star, Copy, Check, Heart, HeartOff, UserPlus, CalendarHeart, Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'
import confetti from 'canvas-confetti'

const perks = [
  {
    title: 'Free Meal Bonus',
    description: 'Get 1 free meal for every friend who signs up',
    icon: Gift,
    color: 'sage',
  },
  {
    title: 'Early Access',
    description: 'Be the first to try new menu items',
    icon: Star,
    color: 'terracotta',
  },
  {
    title: 'Birthday Surprise',
    description: 'Special gift during your birthday month',
    icon: Award,
    color: 'dusty-rose',
  },
  {
    title: 'Exclusive Events',
    description: 'VIP access to member-only workshops',
    icon: Share2,
    color: 'sage-600',
  },
]

export default function PerksPage() {
  const user = useAppStore((state) => state.user)
  const [copied, setCopied] = useState(false)
  const [donationEnabled, setDonationEnabled] = useState(false)
  const [donationPercentage, setDonationPercentage] = useState(25)
  const [customPercentage, setCustomPercentage] = useState('')

  // Nominate a Mama form state
  const [nominationForm, setNominationForm] = useState({
    name: '',
    date: '',
    email: '',
    phone: '',
    address: ''
  })
  const [nominationSubmitted, setNominationSubmitted] = useState(false)

  const referralCode = 'SARAH2024'
  const referralLink = `https://eatmothership.com/join?ref=${referralCode}`

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDonationPercentageChange = (percentage: number) => {
    setDonationPercentage(percentage)
    setCustomPercentage('')
  }

  const handleCustomPercentageChange = (value: string) => {
    const numValue = parseInt(value)
    if (value === '' || (numValue >= 1 && numValue <= 110)) {
      setCustomPercentage(value)
      if (numValue) {
        setDonationPercentage(numValue)
      }
    }
  }

  const triggerHeartConfetti = () => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.8,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#D6AFA3', '#C88B6C', '#F4B5A8', '#E8A597']
    }

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 30,
        scalar: 1.2,
        shapes: ['star']
      })

      confetti({
        ...defaults,
        particleCount: 20,
        scalar: 0.75,
        shapes: ['star']
      })
    }

    setTimeout(shoot, 0)
    setTimeout(shoot, 100)
    setTimeout(shoot, 200)
  }

  const handleDonationToggle = (enabled: boolean) => {
    setDonationEnabled(enabled)
    if (enabled) {
      triggerHeartConfetti()
    }
  }

  const handleNominationChange = (field: string, value: string) => {
    setNominationForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNominationSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Calculate total entries
    let entries = 0
    if (nominationForm.email) entries += 1 // Email = 1 entry
    if (nominationForm.phone) entries += 2 // Phone = +2 entries
    if (nominationForm.address) entries += 3 // Address = +3 entries

    // TODO: Send to database
    console.log('Nomination submitted:', nominationForm, `Total entries: ${entries}`)

    // Show success state
    setNominationSubmitted(true)
    triggerHeartConfetti()

    // Reset form after 3 seconds
    setTimeout(() => {
      setNominationForm({
        name: '',
        date: '',
        email: '',
        phone: '',
        address: ''
      })
      setNominationSubmitted(false)
    }, 3000)
  }

  const getTotalEntries = () => {
    let entries = 0
    if (nominationForm.email) entries += 1 // Email = 1 entry
    if (nominationForm.phone) entries += 2 // Phone = +2 entries
    if (nominationForm.address) entries += 3 // Address = +3 entries
    return entries
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-cream">
        <PortalNav />

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-charcoal mb-2">Perks & Rewards</h1>
            <p className="text-charcoal-70">
              Share Mothership with friends and earn rewards
            </p>
          </div>

          {/* Referral Program */}
          <div className="bg-gradient-to-br from-sage to-sage-600 rounded-3xl p-8 mb-8 text-white shadow-lg">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Referral Program</h2>
                <p className="text-white/90 mb-6">
                  Give your friends $20 off their first order, and you&apos;ll get a free meal when they buy their first meal! Plus earn ongoing commissions based on your loyalty status.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-sm text-white/80 mb-2">Your Referral Code</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{referralCode}</div>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-sm text-white/80 mb-2">Referral Link</div>
                <div className="flex items-center justify-between">
                  <div className="text-sm truncate mr-2">{referralLink}</div>
                  <button
                    onClick={handleCopyLink}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex-shrink-0"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold">3</div>
                <div className="text-white/80 text-sm">Friends Referred</div>
              </div>
              <div>
                <div className="text-3xl font-bold">2</div>
                <div className="text-white/80 text-sm">Active Subscriptions</div>
              </div>
              <div>
                <div className="text-3xl font-bold">2</div>
                <div className="text-white/80 text-sm">Free Meals Earned</div>
              </div>
            </div>
          </div>

          {/* Donation Toggle Section */}
          <div className={`rounded-3xl p-8 mb-8 border-2 transition-all duration-500 ${
            donationEnabled
              ? 'bg-gradient-to-br from-dusty-rose/20 to-blush/20 border-dusty-rose/30 shadow-xl'
              : 'bg-gray-100/50 border-gray-300/50'
          }`}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                donationEnabled
                  ? 'bg-gradient-to-br from-dusty-rose to-terracotta scale-110'
                  : 'bg-gray-400/50'
              }`}>
                {donationEnabled ? (
                  <Heart className="w-6 h-6 text-white animate-pulse" />
                ) : (
                  <HeartOff className="w-6 h-6 text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                {donationEnabled ? (
                  <>
                    <h2 className="text-2xl font-bold text-charcoal mb-2">Thank You for Giving Back!</h2>
                    <p className="text-charcoal-70">
                      Your generosity is helping support mothers who need it most. You&apos;re making a real difference!
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Keeping All Commissions?</h2>
                    <p className="text-charcoal-70">
                      Help a mother in need! Toggle ON to share your blessings and help a mama.
                    </p>
                  </>
                )}
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={donationEnabled}
                  onChange={(e) => handleDonationToggle(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-dusty-rose/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-dusty-rose peer-checked:to-terracotta"></div>
              </label>
            </div>

            {donationEnabled && (
              <div className="animate-fade-in-scale">
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="font-bold text-charcoal mb-2">Choose Your Donation Amount</h3>
                  <p className="text-sm text-charcoal-70 mb-4">
                    Up to 100% comes from your commissions. Go beyond to 110% and donate from your member discounts too!
                  </p>

                  {/* Preset Percentage Buttons */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <button
                      onClick={() => handleDonationPercentageChange(25)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        donationPercentage === 25 && !customPercentage
                          ? 'border-dusty-rose bg-dusty-rose/10 shadow-md'
                          : 'border-gray-200 hover:border-dusty-rose/50'
                      }`}
                    >
                      <div className="text-2xl font-bold text-charcoal">25%</div>
                      <div className="text-xs text-charcoal-70 mt-1">Quarter</div>
                    </button>
                    <button
                      onClick={() => handleDonationPercentageChange(50)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        donationPercentage === 50 && !customPercentage
                          ? 'border-dusty-rose bg-dusty-rose/10 shadow-md'
                          : 'border-gray-200 hover:border-dusty-rose/50'
                      }`}
                    >
                      <div className="text-2xl font-bold text-charcoal">50%</div>
                      <div className="text-xs text-charcoal-70 mt-1">Half</div>
                    </button>
                    <button
                      onClick={() => handleDonationPercentageChange(100)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        donationPercentage === 100 && !customPercentage
                          ? 'border-dusty-rose bg-dusty-rose/10 shadow-md'
                          : 'border-gray-200 hover:border-dusty-rose/50'
                      }`}
                    >
                      <div className="text-2xl font-bold text-charcoal">100%</div>
                      <div className="text-xs text-charcoal-70 mt-1">All</div>
                    </button>
                    <button
                      onClick={() => handleDonationPercentageChange(110)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 relative overflow-visible ${
                        donationPercentage === 110 && !customPercentage
                          ? 'border-terracotta bg-gradient-to-br from-dusty-rose/20 to-terracotta/20 shadow-lg scale-105'
                          : 'border-terracotta/30 bg-gradient-to-br from-dusty-rose/10 to-terracotta/10 hover:border-terracotta/60'
                      }`}
                    >
                      <div className="text-2xl font-bold text-terracotta">110%</div>
                      <div className="text-xs text-terracotta mt-1 font-semibold">Above & Beyond</div>
                      <span className="absolute -top-2 -right-2 bg-terracotta text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-md">
                        MAX
                      </span>
                    </button>
                  </div>

                  {/* 110% Explanation */}
                  {donationPercentage === 110 && (
                    <div className="mb-4 p-4 bg-terracotta/10 border border-terracotta/30 rounded-xl animate-fade-in-scale">
                      <h4 className="font-bold text-terracotta mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4 fill-current" />
                        110% Breakdown
                      </h4>
                      <ul className="text-sm text-charcoal-70 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-terracotta font-bold mt-0.5">•</span>
                          <span><strong>100%</strong> of your referral commissions donated to mamas in need</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-terracotta font-bold mt-0.5">•</span>
                          <span><strong>10%</strong> from your membership discount donated (you still keep your loyalty rewards!)</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Custom Percentage Input */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Or enter a custom percentage (1-110%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="110"
                        value={customPercentage}
                        onChange={(e) => handleCustomPercentageChange(e.target.value)}
                        placeholder="Enter 1-110"
                        className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-dusty-rose transition-colors"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-70 font-medium">
                        %
                      </span>
                    </div>
                    {parseInt(customPercentage) > 100 && (
                      <p className="text-xs text-terracotta mt-2 flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-current" />
                        Extra {parseInt(customPercentage) - 100}% will come from your member discounts
                      </p>
                    )}
                  </div>

                  {/* Impact Display */}
                  <div className={`mt-6 p-6 rounded-xl border-2 shadow-lg transition-all duration-500 ${
                    donationPercentage > 100
                      ? 'bg-gradient-to-r from-terracotta/30 to-blush/30 border-terracotta/50'
                      : 'bg-gradient-to-r from-dusty-rose/20 to-blush/20 border-dusty-rose/30'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm font-medium text-dusty-rose mb-1 flex items-center gap-2">
                          <Heart className="w-4 h-4 fill-current" />
                          {donationPercentage > 100 ? 'Your EXTRAORDINARY Impact!' : 'Your Incredible Impact'}
                        </div>
                        <div className="text-2xl font-bold text-dusty-rose">
                          {donationPercentage <= 100 ? (
                            `${donationPercentage}% of commissions donated`
                          ) : (
                            <>100% commissions + {donationPercentage - 100}% discounts</>
                          )}
                        </div>
                      </div>
                      <div className="relative">
                        <Heart className="w-12 h-12 text-dusty-rose animate-pulse" />
                        <div className="absolute inset-0 w-12 h-12 text-terracotta animate-ping opacity-50">
                          <Heart className="w-12 h-12" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3 backdrop-blur-sm">
                      {donationPercentage >= 110 ? (
                        <p className="text-sm text-charcoal font-bold">
                          WOW! You&apos;re going above and beyond by donating from your own member discounts! Your extraordinary generosity is providing meals to mothers in crisis. You&apos;re a true champion of maternal care!
                        </p>
                      ) : donationPercentage === 100 ? (
                        <p className="text-sm text-charcoal font-bold">
                          Incredible! You&apos;re giving everything you earn to support mothers in need. Your selfless spirit embodies the sisterhood we&apos;re building. Together, we rise!
                        </p>
                      ) : donationPercentage >= 50 ? (
                        <p className="text-sm text-charcoal font-medium">
                          Thank you for sharing half your blessings! Your generous heart is feeding mothers and babies during their most vulnerable time. Your kindness ripples through entire families.
                        </p>
                      ) : donationPercentage >= 25 ? (
                        <p className="text-sm text-charcoal font-medium">
                          Every bit counts, and you&apos;re making it count! Your contribution is putting nutritious meals on tables for new mamas. You&apos;re part of something beautiful.
                        </p>
                      ) : (
                        <p className="text-sm text-charcoal font-medium">
                          You&apos;re a hero! Your generosity provides nutritious meals to mothers facing financial hardship during their postpartum journey. Every donation changes lives.
                        </p>
                      )}
                    </div>
                  </div>

                  <button className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-dusty-rose to-terracotta text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                    Save Donation Settings
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Nominate a Mama Section */}
          <div className="bg-gradient-to-br from-blush/30 to-dusty-rose/20 rounded-3xl p-8 mb-8 border-2 border-blush/30 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blush to-dusty-rose rounded-xl flex items-center justify-center flex-shrink-0">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-charcoal mb-2">Nominate a Mama!</h2>
                <p className="text-charcoal-70">
                  Know a mother who could use support? Nominate her for our weekly meal donation! Winners are randomly selected each week.
                </p>
              </div>
            </div>

            {nominationSubmitted ? (
              <div className="bg-white rounded-2xl p-8 text-center animate-fade-in-scale">
                <div className="w-16 h-16 bg-gradient-to-br from-blush to-dusty-rose rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-2">Nomination Submitted!</h3>
                <p className="text-charcoal-70 mb-4">
                  Thank you for spreading love and support. This mama has been entered into our weekly drawing!
                </p>
                <div className="inline-block px-4 py-2 bg-blush/20 rounded-full">
                  <span className="text-sm font-semibold text-dusty-rose">
                    {getTotalEntries()} {getTotalEntries() === 1 ? 'entry' : 'entries'} added
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNominationSubmit} className="bg-white rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Name - Required */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Mama&apos;s Name <span className="text-terracotta">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={nominationForm.name}
                        onChange={(e) => handleNominationChange('name', e.target.value)}
                        placeholder="Enter her name"
                        className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blush transition-colors"
                      />
                      <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Due Date or Matrescence Day - Required */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Due Date or Matrescence Day <span className="text-terracotta">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={nominationForm.date}
                        onChange={(e) => handleNominationChange('date', e.target.value)}
                        className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blush transition-colors"
                      />
                      <CalendarHeart className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-xs text-charcoal-60 mt-1">The day she became or will become a mother</p>
                  </div>

                  {/* Email - Required */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Email Address <span className="text-terracotta">*</span> <span className="text-sage text-xs font-semibold">(1 entry)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={nominationForm.email}
                        onChange={(e) => handleNominationChange('email', e.target.value)}
                        placeholder="her@email.com"
                        className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blush transition-colors"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Phone - Optional +2 entries */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Phone Number <span className="text-sage text-xs font-semibold">(+2 entries)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={nominationForm.phone}
                        onChange={(e) => handleNominationChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blush transition-colors"
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Address - Optional +3 entries */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Mailing Address <span className="text-sage text-xs font-semibold">(+3 entries)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={nominationForm.address}
                      onChange={(e) => handleNominationChange('address', e.target.value)}
                      placeholder="123 Main St, City, State ZIP"
                      className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blush transition-colors"
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Entry Counter */}
                {(nominationForm.name || nominationForm.email || nominationForm.date) && (
                  <div className="mb-4 p-3 bg-sage/10 border border-sage/30 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-charcoal-70">Total Drawing Entries:</span>
                      <span className="text-lg font-bold text-sage">{getTotalEntries()}</span>
                    </div>
                    <p className="text-xs text-charcoal-60 mt-1">
                      More info = more chances to win!
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-blush to-dusty-rose text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Submit Nomination
                </button>
              </form>
            )}
          </div>

          {/* Member Perks */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Member Perks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {perks.map((perk, index) => {
                const Icon = perk.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className={`w-12 h-12 bg-${perk.color}/10 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 text-${perk.color}`} style={{ color: perk.color === 'sage' ? '#A8B99C' : perk.color === 'terracotta' ? '#C88B6C' : perk.color === 'dusty-rose' ? '#D6AFA3' : '#8A9B7E' }} />
                    </div>
                    <h3 className="font-bold text-charcoal mb-2">{perk.title}</h3>
                    <p className="text-sm text-charcoal-70">{perk.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Loyalty Progress */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-sage" />
              <h2 className="text-2xl font-bold text-charcoal">Loyalty Status</h2>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-charcoal">Progress to Gold Member</span>
                <span className="text-sm text-charcoal-70">12 / 20 orders</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sage to-sage-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: '60%' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-cream rounded-2xl text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-charcoal mb-1">Silver</div>
                <div className="text-xs text-charcoal-70 mb-1">2% referral commission</div>
                <div className="text-xs text-charcoal-70">5% off all orders</div>
                <div className="mt-2 text-xs bg-sage/10 text-sage px-2 py-1 rounded-full inline-block">
                  Current Level
                </div>
              </div>

              <div className="p-4 bg-cream rounded-2xl text-center opacity-60">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-charcoal mb-1">Gold</div>
                <div className="text-xs text-charcoal-70 mb-1">3% referral commission</div>
                <div className="text-xs text-charcoal-70">10% off all orders</div>
                <div className="mt-2 text-xs text-charcoal-60">8 orders to unlock</div>
              </div>

              <div className="p-4 bg-cream rounded-2xl text-center opacity-40">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-charcoal mb-1">Platinum</div>
                <div className="text-xs text-charcoal-70 mb-1">5% referral commission</div>
                <div className="text-xs text-charcoal-70">15% off + VIP perks</div>
                <div className="mt-2 text-xs text-charcoal-60">38 orders to unlock</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
