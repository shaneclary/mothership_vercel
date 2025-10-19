'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import ProtectedRoute from '@/components/protected-route'
import PortalNav from '@/components/portal-nav'
import { RewardService } from '@/lib/rewards/rewardService'
import { REWARDS_CATALOG, BADGES, POINTS_CONFIG, REWARD_LEVELS } from '@/lib/rewards/constants'
import { REWARD_ENGINE_CONFIG, getTierByRevenue } from '@/lib/rewards/reward-engine-schema'
import { Gift, Award, TrendingUp, Heart, Sparkles } from 'lucide-react'
import Image from 'next/image'

function RewardsContent() {
  const user = useAppStore((state) => state.user)
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    loadRewardsSummary()
  }, [user])

  const loadRewardsSummary = async () => {
    if (!user) return
    try {
      const data = await RewardService.getUserRewardsSummary(user.email || 'demo')
      setSummary(data)
    } catch (error) {
      console.error('Error loading rewards:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream to-blush flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-green mx-auto mb-4"></div>
          <p className="text-charcoal-70">Gathering your garden...</p>
        </div>
      </div>
    )
  }

  const progressPercent = summary?.nextLevel
    ? ((summary.totalPoints - summary.level.minPoints) / (summary.nextLevel.minPoints - summary.level.minPoints)) * 100
    : 100

  // Get current tier based on mock revenue
  const currentTier = getTierByRevenue(0) // Will use actual revenue data from database later
  const pointsValue = REWARD_ENGINE_CONFIG.system.pointsExchangeRate.inverse

  // Mock monthly engagement progress (will come from database later)
  const monthlyEngagementPoints = 3200 // Mock: user has earned 3200 points this month
  const monthlyGoal = REWARD_ENGINE_CONFIG.earningLimits.engagementGlobalMonthlyCapPoints
  const monthlyProgress = (monthlyEngagementPoints / monthlyGoal) * 100

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cream to-blush">
      <PortalNav />

      <main className="flex-1 overflow-auto">
        {/* Header - Living Garden of Reciprocity */}
        <div className="bg-gradient-to-br from-sage-green via-nourish-start to-forest-green px-4 py-8 relative overflow-hidden">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQgNGMwIDItMiA0LTQgNHMtNC0yLTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>

          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="font-script text-4xl text-white mb-2 text-center">Your Living Garden</h1>
            <p className="text-white/90 text-center mb-6 italic">A circle of reciprocity — care flows both ways</p>

            {/* Points Balance with Petal Pulse */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-glow">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-white mb-2 animate-petal-pulse">
                  {summary?.currentPoints.toLocaleString()}
                </div>
                <div className="text-white/80 text-sm font-semibold">{REWARD_ENGINE_CONFIG.system.currencyLabel}</div>
                <div className="text-white/60 text-xs mt-1">
                  ${(summary?.currentPoints / pointsValue).toFixed(2)} nourishment value
                </div>
              </div>

              {/* Botanical Level Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl animate-bloom">{summary?.level.emoji}</span>
                    <div>
                      <div className="text-white font-bold text-lg">{summary?.level.name}</div>
                      <div className="text-white/70 text-xs italic">{summary?.level.description}</div>
                    </div>
                  </div>
                  {summary?.nextLevel && (
                    <div className="flex items-center gap-2 text-right">
                      <div>
                        <div className="text-white/60 text-xs mb-1">Blooming toward:</div>
                        <div className="text-white/90 text-sm font-semibold">{summary?.nextLevel.name}</div>
                      </div>
                      <span className="text-3xl opacity-60">{summary?.nextLevel.emoji}</span>
                    </div>
                  )}
                </div>

                {/* Progress bar with organic gradient */}
                <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-gold via-warn to-terracotta h-full transition-all duration-700 ease-out rounded-full shadow-glow"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                {summary?.nextLevel && (
                  <div className="text-white/70 text-xs mt-2 text-center">
                    {summary.pointsToNextLevel.toLocaleString()} more nourishments until your next bloom
                  </div>
                )}
              </div>

              {/* Tier Benefits - Revenue-Based */}
              <div className="bg-white/5 rounded-2xl p-4 mt-4 border border-white/10">
                <div className="text-white/90 text-sm text-center mb-2 font-semibold">
                  {currentTier.emoji} {currentTier.name} Tier Benefits
                </div>
                <div className="flex items-center justify-center gap-6 text-white/80 text-xs">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-gold" />
                    <span>{summary?.level.multiplier}x points on care activities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gold" />
                    <span>{(currentTier.referralBonusPct * 100).toFixed(0)}% referral bonus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Engagement Goal Progress - Achievement Focus */}
        <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-20">
          <div className="bg-gradient-to-br from-white to-blush/10 rounded-2xl p-6 shadow-xl border-2 border-gold/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage-green to-forest-green flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal text-lg">Monthly Engagement Goal</h3>
                  <p className="text-xs text-charcoal-70 italic">Your care creates community</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-sage-green">
                  {monthlyEngagementPoints.toLocaleString()}
                </div>
                <div className="text-xs text-charcoal-70">
                  of {monthlyGoal.toLocaleString()} pts
                </div>
              </div>
            </div>

            {/* Progress bar with milestone markers */}
            <div className="relative">
              <div className="w-full bg-sage-green/10 rounded-full h-6 overflow-hidden shadow-inner border border-sage-green/20">
                <div
                  className="bg-gradient-to-r from-sage-green via-gold to-terracotta h-full transition-all duration-700 ease-out rounded-full shadow-md relative overflow-hidden"
                  style={{ width: `${Math.min(monthlyProgress, 100)}%` }}
                >
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>

              {/* Percentage label */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-full">
                <div className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {Math.round(monthlyProgress)}%
                </div>
              </div>
            </div>

            {/* Encouraging message based on progress */}
            <div className="mt-4 text-center">
              {monthlyProgress >= 100 ? (
                <div className="flex items-center justify-center gap-2 text-gold font-semibold">
                  <Sparkles className="w-4 h-4 animate-glow-pulse" />
                  <span>Goal complete! Keep engaging — your participation always matters!</span>
                  <Sparkles className="w-4 h-4 animate-glow-pulse" />
                </div>
              ) : monthlyProgress >= 90 ? (
                <p className="text-sage-green font-semibold">
                  Amazing! You're at {Math.round(monthlyProgress)}% — almost there! 🌸
                </p>
              ) : monthlyProgress >= 50 ? (
                <p className="text-charcoal-70">
                  Wonderful growth — you're over halfway to your monthly goal! 🌿
                </p>
              ) : (
                <p className="text-charcoal-70">
                  {monthlyGoal - monthlyEngagementPoints} points until you reach your monthly goal 🌱
                </p>
              )}
            </div>

            {/* Points remaining */}
            {monthlyProgress < 100 && (
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-charcoal-70">
                <div className="w-1.5 h-1.5 rounded-full bg-sage-green"></div>
                <span>{(monthlyGoal - monthlyEngagementPoints).toLocaleString()} points to 100%</span>
                <div className="w-1.5 h-1.5 rounded-full bg-sage-green"></div>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['overview', 'earn', 'rewards', 'badges', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-sage-green text-white shadow-md'
                  : 'bg-white text-charcoal hover:bg-sage-green/10'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-white to-blush/20 rounded-2xl p-6 shadow-card border border-sage-green/10 text-center">
                <div className="text-3xl font-bold text-sage-green mb-1 animate-petal-pulse">
                  {summary?.totalPoints.toLocaleString()}
                </div>
                <div className="text-sm text-charcoal-70">Lifetime {REWARD_ENGINE_CONFIG.system.currencyLabel}</div>
                <div className="text-xs text-charcoal-70/60 mt-1">
                  ${(summary?.totalPoints / pointsValue).toFixed(2)} total value
                </div>
              </div>
              <div className="bg-gradient-to-br from-white to-sage-green/10 rounded-2xl p-6 shadow-card border border-sage-green/10 text-center">
                <div className="text-3xl font-bold text-gold mb-1">
                  {summary?.badges.length}
                </div>
                <div className="text-sm text-charcoal-70">Milestones Unlocked</div>
                <div className="text-xs text-charcoal-70/60 mt-1">
                  {Object.values(BADGES).length - summary?.badges.length} remaining
                </div>
              </div>
            </div>

            {/* Recent Badges */}
            {summary?.badges.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-card border border-sage-green/10">
                <h3 className="font-bold text-charcoal text-lg mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold" />
                  Recent Blooms
                </h3>
                <div className="flex flex-wrap gap-3">
                  {summary.badges.slice(0, 6).map((userBadge: any) => {
                    const badge = Object.values(BADGES).find((b) => b.code === userBadge.badge_code)
                    return badge ? (
                      <div key={userBadge.id} className="flex items-center gap-2 bg-gradient-to-br from-sage-green/10 to-gold/5 border border-gold/20 rounded-full px-4 py-2 shadow-sm">
                        <span className="text-2xl">{badge.emoji}</span>
                        <span className="text-sm font-medium text-charcoal">{badge.name}</span>
                      </div>
                    ) : null
                  })}
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-sage-green/10">
              <h3 className="font-bold text-charcoal text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-sage-green" />
                Your Garden's Growth
              </h3>
              <div className="space-y-3">
                {summary?.recentActivity.slice(0, 5).map((transaction: any) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-3 border-b border-sage-green/10 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="text-charcoal font-medium">{transaction.description}</p>
                      <p className="text-xs text-charcoal-70">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div
                      className={`font-bold text-lg ${
                        transaction.points > 0 ? 'text-sage-green' : 'text-warn'
                      }`}
                    >
                      {transaction.points > 0 ? '+' : ''}
                      {transaction.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Earn Tab */}
        {activeTab === 'earn' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blush/30 to-sage-green/20 rounded-2xl p-6 border border-gold/30 shadow-card">
              <h3 className="font-bold text-charcoal text-lg mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                Nourish & Be Nourished
              </h3>
              <p className="text-charcoal-70 text-sm leading-relaxed">
                Your care creates beauty. Every action — from ordering for yourself to sharing with another mama — grows your garden and earns {REWARD_ENGINE_CONFIG.system.currencyLabel}.
              </p>
            </div>

            {/* Revenue-Generating Actions (UNCAPPED) */}
            <div className="bg-gradient-to-br from-gold/10 to-transparent rounded-2xl p-1 border-2 border-gold/40">
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-charcoal text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-gold" />
                    Revenue Actions — Unlimited Growth
                  </h4>
                  <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full">NO CAP</span>
                </div>
                <p className="text-xs text-charcoal-70 mb-4 italic">These actions directly nourish revenue — earn without limits!</p>
                <div className="space-y-3">
                  <EarnItem
                    title="Share the circle — Refer a friend who orders ($50+)"
                    points="$20 credit + 2-8% bonus pts"
                    description="Your care ripples outward"
                    badge="unlimited"
                  />
                  <EarnItem
                    title="Enhance your ritual — Add upsell items"
                    points="1% back in points"
                    description="Herbal tea, bone broth, ritual kits"
                  />
                  <EarnItem
                    title="Care for yourself — Repeat orders & subscriptions"
                    points="0.5% loyalty back"
                    description="Consistent care recognized"
                  />
                </div>
              </div>
            </div>

            {/* Engagement Goal Progress */}
            <EarnCategory
              title="Community Connection"
              emoji="💬"
              subtitle={`Monthly goal: ${REWARD_ENGINE_CONFIG.earningLimits.engagementGlobalMonthlyCapPoints.toLocaleString()} pts total`}
              items={[
                { title: 'Share a new post or reflection', points: '500 pts', cap: 'Goal: 4000/mo', description: 'Your journey matters' },
                { title: 'Reply with wisdom & support', points: '100 pts', cap: 'Goal: 1500/mo', description: 'Build connection' },
                { title: 'Monthly check-in prompt', points: '1000 pts', cap: 'Goal: 1x/mo', description: 'Growth recognized' },
                { title: 'Post receives 3+ positive reactions', points: '300 pts', cap: 'Goal: 1500/mo', description: 'Your kindness ripples' },
              ]}
            />

            <EarnCategory
              title="Milestones & Growth"
              emoji="🌸"
              subtitle="Celebrate your progress"
              items={[
                { title: 'Self-care milestone achieved', points: '2000 pts', cap: 'Goal: 4000/mo', description: 'A new bloom opens' },
                { title: 'First order placed', points: '200 pts', badge: 'one-time' },
                { title: 'Complete your care profile', points: '100 pts', badge: 'one-time' },
              ]}
            />

            {/* Engagement Goal Notice */}
            <div className="bg-gradient-to-br from-sage-green/10 to-gold/5 border border-sage-green/30 rounded-2xl p-4 text-sm">
              <p className="font-semibold text-charcoal mb-1 flex items-center gap-2">
                <Heart className="w-4 h-4 text-sage-green" />
                About Your Monthly Engagement Goal
              </p>
              <p className="text-xs text-charcoal-70 leading-relaxed">
                Each month, work toward earning up to <span className="font-bold text-sage-green">{REWARD_ENGINE_CONFIG.earningLimits.engagementGlobalMonthlyCapPoints.toLocaleString()} points</span> through community engagement. Once you reach 100% of your goal, you can still participate freely — revenue actions (referrals, orders) always earn <span className="font-bold text-gold">unlimited</span> points. Your voice and care always matter here.
              </p>
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blush/30 to-sage-green/20 rounded-2xl p-6 border border-gold/30 shadow-card">
              <h3 className="font-bold text-charcoal text-lg mb-2 flex items-center gap-2">
                <Gift className="w-5 h-5 text-gold" />
                Harvest Your Garden
              </h3>
              <p className="text-charcoal-70 text-sm leading-relaxed mb-3">
                Turn your {REWARD_ENGINE_CONFIG.system.currencyLabel} into nourishment — for yourself or to share with another mama.
              </p>
              <div className="flex items-center gap-4 text-xs bg-white/50 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold"></div>
                  <span className="text-charcoal-70">Minimum: {REWARD_ENGINE_CONFIG.redemption.minRedeemPoints.toLocaleString()} pts (${(REWARD_ENGINE_CONFIG.redemption.minRedeemPoints / pointsValue).toFixed(2)})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sage-green"></div>
                  <span className="text-charcoal-70">{pointsValue} points = $1.00</span>
                </div>
              </div>
            </div>

            {/* Redemption Options */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-sage-green/10">
              <h4 className="font-bold text-charcoal text-lg mb-4">How You Can Redeem</h4>
              <div className="space-y-3">
                {REWARD_ENGINE_CONFIG.redemption.options.map((option) => (
                  <div key={option.id} className="flex items-start gap-4 p-4 bg-sage-green/5 rounded-xl border border-sage-green/20">
                    <div className="text-2xl">
                      {option.id === 'store_credit' && '🛍️'}
                      {option.id === 'gift_mama' && '💝'}
                      {option.id === 'donation_pool' && '🌸'}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-charcoal mb-1">{option.label}</h5>
                      <p className="text-xs text-charcoal-70 italic">"{option.description}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Self-Care Rewards */}
            <RewardTier
              title="Nourish Yourself"
              emoji="🤱"
              rewards={REWARDS_CATALOG.filter((r) => r.tier === 1)}
              userPoints={summary?.currentPoints || 0}
            />

            {/* Community Gifts */}
            <RewardTier
              title="Gift Another Mama"
              emoji="💝"
              rewards={REWARDS_CATALOG.filter((r) => r.tier === 2)}
              userPoints={summary?.currentPoints || 0}
            />

            {/* Premium Experiences */}
            <RewardTier
              title="Premium Care Experiences"
              emoji="✨"
              rewards={REWARDS_CATALOG.filter((r) => r.tier === 3)}
              userPoints={summary?.currentPoints || 0}
            />

            {/* Legacy Builder */}
            <RewardTier
              title="Community Legacy"
              emoji="🏡"
              rewards={REWARDS_CATALOG.filter((r) => r.tier === 4)}
              userPoints={summary?.currentPoints || 0}
            />
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blush/30 to-sage-green/20 rounded-2xl p-6 border border-gold/30 shadow-card">
              <h3 className="font-bold text-charcoal text-lg mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" />
                Your Growth Journey
              </h3>
              <p className="text-charcoal-70 text-sm leading-relaxed">
                Every milestone is a petal unfolding. Collect badges as you bloom through your matrescence journey.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.values(BADGES).map((badge) => {
                const earned = summary?.badges.find((b: any) => b.badge_code === badge.code)
                return (
                  <div
                    key={badge.code}
                    className={`rounded-2xl p-6 text-center transition-all duration-300 ${
                      earned
                        ? 'bg-gradient-to-br from-sage-green/10 via-gold/5 to-blush/10 border-2 border-gold/40 shadow-glow'
                        : 'bg-white/30 border border-charcoal/10 opacity-50 grayscale'
                    }`}
                  >
                    {/* Badge emoji with halo for earned */}
                    <div className={`text-5xl mb-3 inline-block ${earned ? 'animate-bloom' : ''}`}>
                      {earned && (
                        <div className="relative inline-block">
                          {/* Radial glow halo */}
                          <div className="absolute inset-0 bg-gradient-radial from-gold/30 via-gold/10 to-transparent blur-xl scale-150 animate-glow-pulse"></div>
                          <span className="relative z-10">{badge.emoji}</span>
                        </div>
                      )}
                      {!earned && <span>{badge.emoji}</span>}
                    </div>

                    <h4 className={`font-bold mb-2 ${earned ? 'text-charcoal' : 'text-charcoal-70'}`}>
                      {badge.name}
                    </h4>
                    <p className={`text-xs mb-3 ${earned ? 'text-charcoal-70' : 'text-charcoal-70/70'}`}>
                      {badge.description}
                    </p>

                    {earned ? (
                      <div className="inline-flex items-center gap-1 bg-gradient-to-r from-sage-green to-forest-green text-white text-xs px-3 py-1.5 rounded-full shadow-md">
                        <Award className="w-3 h-3" />
                        Unlocked
                      </div>
                    ) : (
                      <div className="text-xs text-charcoal-70 italic">Not yet bloomed</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blush/30 to-sage-green/20 rounded-2xl p-6 border border-sage-green/20 shadow-card">
              <h3 className="font-bold text-charcoal text-lg mb-2">Your Care Timeline</h3>
              <p className="text-charcoal-70 text-sm">
                Every ripple in your garden of reciprocity
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-card border border-sage-green/10 divide-y divide-sage-green/10">
              {summary?.recentActivity.map((transaction: any) => (
                <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-sage-green/5 transition-colors">
                  <div className="flex-1">
                    <p className="text-charcoal font-medium mb-1">{transaction.description}</p>
                    <div className="flex items-center gap-3 text-xs text-charcoal-70">
                      <span>{new Date(transaction.created_at).toLocaleString()}</span>
                      <span className="px-2 py-1 bg-gradient-to-r from-sage-green/10 to-gold/10 text-sage-green rounded-full border border-sage-green/20">
                        {transaction.category}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`font-bold text-lg ${
                      transaction.points > 0 ? 'text-sage-green' : 'text-warn'
                    }`}
                  >
                    {transaction.points > 0 ? '+' : ''}
                    {transaction.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </main>
    </div>
  )
}

// Helper Components
function EarnCategory({ title, emoji, subtitle, items }: { title: string; emoji: string; subtitle?: string; items: any[] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card border border-sage-green/10">
      <div className="mb-4">
        <h4 className="font-bold text-charcoal text-lg mb-1 flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          {title}
        </h4>
        {subtitle && (
          <p className="text-xs text-charcoal-70 italic ml-9">{subtitle}</p>
        )}
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <EarnItem key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

function EarnItem({ title, points, badge, cap, description }: {
  title: string;
  points: string;
  badge?: string;
  cap?: string;
  description?: string;
}) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-sage-green/10 last:border-0">
      <div className="flex-1">
        <div className="text-charcoal font-medium mb-1">{title}</div>
        {description && (
          <div className="text-xs text-charcoal-70 italic">"{description}"</div>
        )}
      </div>
      <div className="flex flex-col items-end gap-1 ml-4">
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-xs px-2 py-1 bg-gold/20 text-gold rounded-full font-semibold">
              {badge}
            </span>
          )}
          <span className="font-bold text-sage-green whitespace-nowrap">{points}</span>
        </div>
        {cap && (
          <span className="text-xs text-warn">{cap}</span>
        )}
      </div>
    </div>
  )
}

function RewardTier({ title, emoji, rewards, userPoints }: any) {
  return (
    <div>
      <h4 className="font-bold text-charcoal text-lg mb-4 flex items-center gap-2">
        {emoji && <span className="text-2xl">{emoji}</span>}
        {title}
      </h4>
      <div className="space-y-3">
        {rewards.map((reward: any) => (
          <RewardItem key={reward.id} reward={reward} userPoints={userPoints} />
        ))}
      </div>
    </div>
  )
}

function RewardItem({ reward, userPoints }: any) {
  const canAfford = userPoints >= reward.points

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-sage-green/20 flex items-center justify-between">
      <div className="flex-1">
        <h5 className="font-semibold text-charcoal mb-1">{reward.name}</h5>
        <p className="text-sm text-sage-green font-bold">{reward.points.toLocaleString()} points</p>
      </div>
      <button
        disabled={!canAfford}
        className={`px-6 py-2 rounded-full font-semibold transition-all ${
          canAfford
            ? 'bg-sage-green text-white hover:bg-forest-green shadow-md hover:shadow-lg'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Redeem
      </button>
    </div>
  )
}

export default function RewardsPage() {
  return (
    <ProtectedRoute>
      <RewardsContent />
    </ProtectedRoute>
  )
}
