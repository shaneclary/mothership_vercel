// Mothership Rewards Service
// This service manages all points, badges, and rewards logic

import { supabase } from '@/lib/supabase'
import { POINTS_CONFIG, REWARD_LEVELS, BADGES } from './constants'
import type { RewardLevel } from './constants'

export class RewardService {
  // Award points to a user
  static async awardPoints(
    userId: string,
    points: number,
    category: string,
    description: string,
    referenceId?: string
  ) {
    try {
      // For now, use mock data - will connect to Supabase once database is ready
      console.log('🎁 Points awarded:', { userId, points, category, description })

      // TODO: Implement real Supabase integration
      // Check for multipliers (golden hour, level bonus, etc.)
      const hour = new Date().getHours()
      const isGoldenHour = hour >= 2 && hour < 4

      // Mock user data
      const mockUser = {
        total_points: 2500,
        current_points: 1200,
        reward_level: 1
      }

      const level = this.getUserLevel(mockUser.total_points)
      const multiplier = level.multiplier
      const finalMultiplier = isGoldenHour ? multiplier * POINTS_CONFIG.GOLDEN_HOUR_MULTIPLIER : multiplier
      const finalPoints = Math.round(points * finalMultiplier)

      return {
        points: finalPoints,
        multiplier: finalMultiplier,
        isGoldenHour
      }
    } catch (error) {
      console.error('Error awarding points:', error)
      throw error
    }
  }

  // Redeem points for a reward
  static async redeemPoints(
    userId: string,
    rewardId: string,
    pointsCost: number
  ) {
    try {
      console.log('💰 Points redeemed:', { userId, rewardId, pointsCost })

      // TODO: Implement real redemption logic with Supabase
      return {
        success: true,
        message: 'Reward redeemed successfully!',
        pointsRemaining: 1200 - pointsCost
      }
    } catch (error) {
      console.error('Error redeeming points:', error)
      throw error
    }
  }

  // Get user's current level based on total points
  static getUserLevel(totalPoints: number): RewardLevel {
    for (let i = REWARD_LEVELS.length - 1; i >= 0; i--) {
      if (totalPoints >= REWARD_LEVELS[i].minPoints) {
        return REWARD_LEVELS[i]
      }
    }
    return REWARD_LEVELS[0]
  }

  // Award a badge to a user
  static async awardBadge(userId: string, badgeCode: string) {
    try {
      console.log('🏅 Badge awarded:', { userId, badgeCode })

      // TODO: Implement real badge awarding with Supabase
      return {
        success: true,
        badgeCode
      }
    } catch (error) {
      console.error('Error awarding badge:', error)
      return { success: false }
    }
  }

  // Get user's complete rewards summary
  static async getUserRewardsSummary(userId: string) {
    try {
      // Mock data for development - replace with real Supabase queries
      const mockData = {
        currentPoints: 1200,
        totalPoints: 2500,
        level: this.getUserLevel(2500),
        nextLevel: REWARD_LEVELS.find(l => l.level === 2),
        pointsToNextLevel: 1000 - 2500,
        badges: [
          {
            id: '1',
            user_id: userId,
            badge_code: 'founding_circle',
            earned_at: new Date().toISOString()
          },
          {
            id: '2',
            user_id: userId,
            badge_code: 'community_builder',
            earned_at: new Date().toISOString()
          }
        ],
        recentActivity: [
          {
            id: '1',
            user_id: userId,
            points: 100,
            type: 'earn' as const,
            category: 'order',
            description: 'Order #ABC123',
            created_at: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: '2',
            user_id: userId,
            points: 50,
            type: 'earn' as const,
            category: 'community',
            description: 'Shared in community',
            created_at: new Date(Date.now() - 172800000).toISOString()
          },
          {
            id: '3',
            user_id: userId,
            points: 25,
            type: 'earn' as const,
            category: 'engagement',
            description: 'Left meal review',
            created_at: new Date(Date.now() - 259200000).toISOString()
          }
        ]
      }

      // Calculate next level info
      if (mockData.nextLevel) {
        mockData.pointsToNextLevel = mockData.nextLevel.minPoints - mockData.totalPoints
      }

      return mockData
    } catch (error) {
      console.error('Error getting rewards summary:', error)
      throw error
    }
  }
}

// Event-based point awards - call these from various parts of your app
export const PointEvents = {
  // Called after order placement
  async onOrderComplete(userId: string, orderTotal: number, orderId: string) {
    const points = Math.floor(orderTotal * POINTS_CONFIG.ORDER_PER_DOLLAR)
    return await RewardService.awardPoints(
      userId,
      points,
      'order',
      `Order #${orderId.slice(0, 8)}`,
      orderId
    )
  },

  // Called when referral completes first order
  async onReferralComplete(referrerId: string, newUserId: string) {
    return await RewardService.awardPoints(
      referrerId,
      POINTS_CONFIG.REFERRAL_COMPLETE,
      'referral',
      'Friend completed first order',
      newUserId
    )
  },

  // Called when user posts in community
  async onCommunityPost(userId: string, postId: string) {
    return await RewardService.awardPoints(
      userId,
      POINTS_CONFIG.POST_MEAL_PHOTO,
      'community',
      'Shared in community',
      postId
    )
  },

  // Called when user comments
  async onCommunityReply(userId: string, commentId: string) {
    return await RewardService.awardPoints(
      userId,
      POINTS_CONFIG.REPLY_TO_POST,
      'community',
      'Replied to post',
      commentId
    )
  },

  // Called when user reviews a meal
  async onMealReview(userId: string, reviewId: string) {
    return await RewardService.awardPoints(
      userId,
      POINTS_CONFIG.RECIPE_REVIEW,
      'engagement',
      'Left meal review',
      reviewId
    )
  },
}
