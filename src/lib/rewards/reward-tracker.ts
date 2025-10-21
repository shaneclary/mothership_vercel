// ============================================================
// REWARD TRACKER SERVICE
// Handles point earning, cap enforcement, and analytics
// ============================================================

import {
  REWARD_ENGINE_CONFIG,
  REWARD_ACTIONS,
  getTierByRevenue,
  isMonthlyCapReached,
  applyDiminishingReturns,
  usdToPoints,
  pointsToUsd,
  type RewardAction,
  type RewardTier,
} from './reward-engine-schema'

// ============================================================
// TYPE DEFINITIONS
// ============================================================

export interface UserRewardStats {
  userId: string
  currentPoints: number
  lifetimePointsEarned: number
  lifetimeReferredRevenue: number
  currentTier: RewardTier

  // Monthly tracking (resets on monthlyResetDay)
  currentMonthEngagementPoints: number
  currentMonthActionCounts: Record<string, number>

  // Expiration tracking
  pointsExpiringIn30Days: number
  oldestPointDate: Date | null

  // Redemption eligibility
  canRedeem: boolean
  redemptionBlockedReason?: string
}

export interface PointTransaction {
  id: string
  userId: string
  actionId: string
  actionType: 'revenue' | 'engagement'
  points: number
  description: string
  metadata?: Record<string, unknown>
  createdAt: Date
  expiresAt: Date
}

export interface EarnPointsRequest {
  userId: string
  actionId: string
  metadata?: {
    orderValue?: number
    referredUserId?: string
    postId?: string
    reactionCount?: number
    [key: string]: unknown
  }
}

export interface EarnPointsResponse {
  success: boolean
  pointsAwarded: number
  message: string
  capReached?: boolean
  diminishedReward?: boolean
  newTotalPoints: number
  tierUpgrade?: {
    oldTier: RewardTier
    newTier: RewardTier
  }
}

// ============================================================
// REWARD TRACKER CLASS
// ============================================================

export class RewardTracker {
  /**
   * Calculate and award points for a specific action
   * Enforces monthly caps and diminishing returns
   */
  static async earnPoints(request: EarnPointsRequest): Promise<EarnPointsResponse> {
    const { userId, actionId, metadata = {} } = request

    // Find the action
    const action = REWARD_ACTIONS.find(a => a.id === actionId)
    if (!action) {
      return {
        success: false,
        pointsAwarded: 0,
        message: 'Invalid action ID',
        newTotalPoints: 0,
      }
    }

    // Get current user stats (would come from database)
    const userStats = await this.getUserStats(userId)

    // Calculate base points
    let basePoints = 0

    if (action.type === 'revenue') {
      basePoints = this.calculateRevenuePoints(action, userStats, metadata)
    } else if (action.type === 'engagement') {
      // Check action-specific monthly goal first
      if (isMonthlyCapReached(actionId, userStats.currentMonthEngagementPoints)) {
        return {
          success: false,
          pointsAwarded: 0,
          message: "Congrats! You have reached your monthly goal for this activity. Keep engaging — your participation always matters!",
          capReached: true,
          newTotalPoints: userStats.currentPoints,
        }
      }

      // Check global engagement goal
      if (userStats.currentMonthEngagementPoints >= REWARD_ENGINE_CONFIG.earningLimits.engagementGlobalMonthlyCapPoints) {
        return {
          success: false,
          pointsAwarded: 0,
          message: "Amazing! You have hit your monthly engagement goal! Keep connecting — revenue actions (referrals, purchases) earn unlimited points!",
          capReached: true,
          newTotalPoints: userStats.currentPoints,
        }
      }

      basePoints = action.rewards.rewardPoints || 0

      // Apply diminishing returns if applicable
      const actionCount = userStats.currentMonthActionCounts[actionId] || 0
      const finalPoints = applyDiminishingReturns(actionId, actionCount, basePoints)

      if (finalPoints < basePoints) {
        return await this.awardPoints(userId, actionId, finalPoints, {
          success: true,
          pointsAwarded: finalPoints,
          message: `Growth recognized — ${finalPoints} Circle Credits earned (diminished due to volume)`,
          diminishedReward: true,
          newTotalPoints: userStats.currentPoints + finalPoints,
        })
      }

      basePoints = finalPoints
    }

    // Award the points
    return await this.awardPoints(userId, actionId, basePoints, {
      success: true,
      pointsAwarded: basePoints,
      message: this.getRewardMessage(action, basePoints),
      newTotalPoints: userStats.currentPoints + basePoints,
    })
  }

  /**
   * Calculate points for revenue-generating actions
   */
  private static calculateRevenuePoints(
    action: RewardAction,
    userStats: UserRewardStats,
    metadata: Record<string, unknown>
  ): number {
    const { orderValue = 0 } = metadata

    // Check minimum order value
    if (action.minOrderValueUsd && orderValue < action.minOrderValueUsd) {
      return 0
    }

    // Calculate based on percentage of sale
    if (action.rewards.pointsPctOfSale) {
      return Math.floor(usdToPoints(orderValue * action.rewards.pointsPctOfSale))
    }

    // Calculate referral points based on tier
    if (action.rewards.referrerPointsPctOfSale) {
      const tier = userStats.currentTier
      return Math.floor(usdToPoints(orderValue * tier.referralBonusPct))
    }

    return 0
  }

  /**
   * Award points to user and create transaction record
   */
  private static async awardPoints(
    userId: string,
    actionId: string,
    points: number,
    response: EarnPointsResponse
  ): Promise<EarnPointsResponse> {
    // This would update the database
    // For now, return the response

    // TODO: Database operations
    // - Create PointTransaction record
    // - Update user's current points
    // - Update monthly tracking
    // - Check for tier upgrade
    // - Trigger automation notifications

    return response
  }

  /**
   * Get reward message with maternal/communal tone
   */
  private static getRewardMessage(action: RewardAction, points: number): string {
    const messages: Record<string, string[]> = {
      referral_purchase: [
        `Your care ripples outward — ${points} Circle Credits earned!`,
        `A new mama nourished through you — ${points} Circle Credits!`,
      ],
      upsell_addon: [
        `Ritual enhanced — ${points} Circle Credits earned!`,
      ],
      direct_purchase: [
        `Care for yourself recognized — ${points} Circle Credits!`,
      ],
      post_reply: [
        `Connection built — ${points} Circle Credits earned!`,
        `Your wisdom shared — ${points} Circle Credits!`,
      ],
      new_post: [
        `Your journey matters — ${points} Circle Credits earned!`,
        `Story shared, hearts touched — ${points} Circle Credits!`,
      ],
      monthly_checkin: [
        `Growth recognized — ${points} Circle Credits earned!`,
      ],
      milestone_badge: [
        `A new bloom opens — ${points} Circle Credits earned!`,
      ],
      peer_endorsement: [
        `Your kindness ripples outward — ${points} Circle Credits!`,
      ],
    }

    const actionMessages = messages[action.id] || [`${points} Circle Credits earned!`]
    return actionMessages[Math.floor(Math.random() * actionMessages.length)]
  }

  /**
   * Get user reward statistics
   * (Mock implementation - would query database)
   */
  static async getUserStats(userId: string): Promise<UserRewardStats> {
    // TODO: Replace with actual database query
    return {
      userId,
      currentPoints: 1200,
      lifetimePointsEarned: 5400,
      lifetimeReferredRevenue: 500,
      currentTier: getTierByRevenue(500),
      currentMonthEngagementPoints: 2100,
      currentMonthActionCounts: {
        post_reply: 8,
        new_post: 3,
      },
      pointsExpiringIn30Days: 0,
      oldestPointDate: new Date('2024-06-01'),
      canRedeem: true,
    }
  }

  /**
   * Check redemption eligibility
   */
  static async checkRedemptionEligibility(userId: string): Promise<{
    eligible: boolean
    reason?: string
  }> {
    const stats = await this.getUserStats(userId)

    // Check minimum points
    if (stats.currentPoints < REWARD_ENGINE_CONFIG.redemption.minRedeemPoints) {
      return {
        eligible: false,
        reason: `Minimum ${REWARD_ENGINE_CONFIG.redemption.minRedeemPoints} Circle Credits required to redeem`,
      }
    }

    // Check conditions (any condition must be met)
    const conditions = REWARD_ENGINE_CONFIG.redemption.eligibleConditions.any

    // TODO: Check actual user data for conditions
    // For now, assume eligible if they have minimum points

    return { eligible: true }
  }

  /**
   * Process point expiration
   * Should be run as a daily cron job
   */
  static async processExpiration(): Promise<void> {
    // TODO: Implement
    // 1. Find points older than 180 days (50% decay)
    // 2. Find points older than 270 days (full expiration)
    // 3. Send notifications for points expiring in 30 days
    // 4. Update point balances
  }

  /**
   * Process monthly reset
   * Should be run on monthlyResetDay
   */
  static async processMonthlyReset(): Promise<void> {
    // TODO: Implement
    // 1. Reset all currentMonthEngagementPoints to 0
    // 2. Reset all currentMonthActionCounts to {}
    // 3. Log monthly analytics snapshot
  }

  /**
   * Get analytics summary
   */
  static async getAnalyticsSummary(): Promise<{
    totalPointsIssued: number
    pointsRedeemed: number
    cacReferralCreditsUsd: number
    ltvPerUserUsd: number
    ltvToCacRatio: number
    paybackDays: number
    engagementToRevenueRatio: number
    healthStatus: 'healthy' | 'warning' | 'critical'
  }> {
    // TODO: Calculate from actual database
    return {
      totalPointsIssued: 150000,
      pointsRedeemed: 45000,
      cacReferralCreditsUsd: 52,
      ltvPerUserUsd: 600,
      ltvToCacRatio: 11.5,
      paybackDays: 30,
      engagementToRevenueRatio: 0.08,  // 8% - healthy
      healthStatus: 'healthy',
    }
  }
}

// ============================================================
// AUTOMATION HELPERS
// ============================================================

export class RewardAutomation {
  /**
   * Check if user is near monthly cap and send notification
   */
  static async checkMonthlyCapNotifications(userId: string): Promise<void> {
    const stats = await RewardTracker.getUserStats(userId)
    const threshold = REWARD_ENGINE_CONFIG.earningLimits.engagementGlobalMonthlyCapPoints * 0.9

    if (stats.currentMonthEngagementPoints >= threshold) {
      // TODO: Send notification
      console.log(`User ${userId} near monthly cap:`, stats.currentMonthEngagementPoints)
    }
  }

  /**
   * Check for tier upgrades and celebrate
   */
  static async checkTierUpgrade(
    userId: string,
    oldRevenue: number,
    newRevenue: number
  ): Promise<void> {
    const oldTier = getTierByRevenue(oldRevenue)
    const newTier = getTierByRevenue(newRevenue)

    if (oldTier.id !== newTier.id) {
      // TODO: Send celebration notification with confetti
      console.log(`🎉 Tier upgrade for ${userId}: ${oldTier.name} → ${newTier.name}`)
    }
  }

  /**
   * Check for expiring points and send reminders
   */
  static async checkExpiringPoints(): Promise<void> {
    // TODO: Query database for points expiring in 30 days
    // Send notifications to affected users
  }
}
