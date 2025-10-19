# 🎁 Mothership Rewards System

A comprehensive points-based rewards system for nurturing community engagement and loyalty.

## 📋 System Overview

The Nourishment Circle rewards members for:
- **Self-Care** - Orders, subscriptions, profile completion
- **Community** - Referrals, posts, replies, events
- **Learning** - Workshops, modules, quizzes
- **Advocacy** - Reviews, social shares, content creation

## 🎯 Key Features

### Points System
- **100 points = $1** in value
- **5 reward levels** (Seedling → Evergreen)
- **Point multipliers** increase with level (1.0x to 1.25x)
- **Golden Hour Bonus** - 2x points for 2-4am orders

### Badges
8 collectible badges for achievements:
- 🌙 Night Owl - 5+ golden hour orders
- 💬 Community Builder - 100+ interactions
- 🎁 Pay It Forward - Gift 3+ meals
- 📚 Wisdom Keeper - Complete all modules
- 🤝 Mentor Mama - Welcome 10+ members
- 🌟 Founding Circle - Launch member
- 🔥 Streak Master - 30-day streak
- 💪 Self-Care Champion - 6+ month subscriber

### Rewards Catalog
**Tier 1: Self-Care** (500-5,000 pts)
- Discounts, free meals, care packages

**Tier 2: Community Gifts** (2,500-6,000 pts)
- Gift meals, sponsor new mamas

**Tier 3: Premium Experiences** (7,500-20,000 pts)
- Consultations, workshops, founder's dinner

**Tier 4: Legacy Builder** (25,000-100,000 pts)
- Name a meal, lifetime membership, ambassador status

## 🚀 Setup Instructions

### 1. Create Supabase Project
```bash
# Go to https://supabase.com
# Create a new project
# Save your project URL and anon key
```

### 2. Run Database Schema
1. Open Supabase SQL Editor
2. Copy contents from `database-schema.sql`
3. Execute the SQL

### 3. Configure Environment Variables
```bash
# Copy .env.rewards.example to .env.local
cp .env.rewards.example .env.local

# Add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

### 4. Enable Rewards Navigation
In `src/components/portal-nav.tsx`, uncomment the rewards link:
```typescript
{ href: '/portal/rewards', label: 'Rewards', icon: Gift }
```

## 🔌 Integration Points

### Award Points on Events

```typescript
import { PointEvents } from '@/lib/rewards/rewardService'

// After order completion
await PointEvents.onOrderComplete(userId, orderTotal, orderId)

// After referral signs up and orders
await PointEvents.onReferralComplete(referrerId, newUserId)

// After community post
await PointEvents.onCommunityPost(userId, postId)

// After meal review
await PointEvents.onMealReview(userId, reviewId)
```

### Check User Points
```typescript
import { RewardService } from '@/lib/rewards/rewardService'

const summary = await RewardService.getUserRewardsSummary(userId)
console.log(summary.currentPoints) // Available points
console.log(summary.level) // Current level info
console.log(summary.badges) // Earned badges
```

### Manual Points Award (Admin)
```typescript
await RewardService.awardPoints(
  userId,
  500, // points
  'bonus', // category
  'Welcome bonus!', // description
  referenceId // optional
)
```

## 📊 Database Tables

- `points_transactions` - All point earnings/redemptions
- `user_badges` - Badges earned by users
- `user_rewards_summary` - Cached totals for performance
- `challenges` - Active and upcoming challenges
- `user_challenge_progress` - Individual challenge tracking

## 🎨 Frontend Pages

- `/portal/rewards` - Main rewards dashboard
- Tabs: Overview, Earn, Rewards, Badges, Activity

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Supabase Auth integration
- Server-side point validation

## 📈 Analytics Ideas

Track engagement metrics:
- Points earned per day/week/month
- Most popular rewards
- Badge unlock rates
- User level distribution
- Redemption patterns

## 🛠️ Future Enhancements

- [ ] Push notifications for points earned
- [ ] Leaderboards (opt-in)
- [ ] Seasonal challenges
- [ ] Referral tiers
- [ ] Points expiration (optional)
- [ ] Admin dashboard for rewards management
- [ ] Email summaries (monthly points recap)
- [ ] Social sharing of badges
- [ ] Team/group challenges
- [ ] Birthday/anniversary bonuses

## 💡 Best Practices

1. **Always validate** point awards server-side
2. **Cache user summaries** for performance
3. **Send notifications** for level ups and badges
4. **Make redemption easy** with clear CTAs
5. **Celebrate milestones** with extra rewards
6. **Keep it fun** and surprising

## 🐛 Troubleshooting

### Points not showing up
- Check Supabase connection
- Verify RLS policies are correct
- Check browser console for errors

### Database connection errors
- Confirm environment variables are set
- Check Supabase project is active
- Verify anon key has correct permissions

### Development Mode
The system currently uses **mock data** until Supabase is configured. You'll see console logs for all point events.

## 📞 Support

For questions or issues:
1. Check the console logs
2. Verify database schema is up to date
3. Test connection with Supabase dashboard
4. Review environment variables

---

Built with ❤️ for the Mothership community
