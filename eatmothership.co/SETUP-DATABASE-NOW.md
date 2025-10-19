# 🚀 Quick Setup - Run Database Schema Now!

## ✅ Step 1: Environment Variables (DONE!)
Your `.env.local` is already configured with Supabase credentials.

## 📊 Step 2: Create Database Tables

### Go to Supabase SQL Editor:
1. Open: https://supabase.com/dashboard/project/tkddlvckadxsjxulcqxp
2. Click **SQL Editor** in the left sidebar
3. Click **+ New Query**

### Copy & Paste This SQL:

Open the file: `src/lib/rewards/database-schema.sql`

OR copy this complete schema:

```sql
-- MOTHERSHIP REWARDS SYSTEM - SUPABASE DATABASE SCHEMA

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Points transactions table
CREATE TABLE IF NOT EXISTS points_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  points INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('earn', 'redeem')),
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  reference_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  badge_code VARCHAR(50) NOT NULL,
  earned_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, badge_code)
);

-- Challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  points_reward INTEGER NOT NULL,
  badge_reward VARCHAR(50),
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  requirements JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User challenge progress
CREATE TABLE IF NOT EXISTS user_challenge_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  progress JSONB,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  UNIQUE(user_id, challenge_id)
);

-- User rewards summary
CREATE TABLE IF NOT EXISTS user_rewards_summary (
  user_id TEXT PRIMARY KEY,
  total_points INTEGER DEFAULT 0,
  current_points INTEGER DEFAULT 0,
  reward_level INTEGER DEFAULT 1,
  last_updated TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_points_user ON points_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_points_created ON points_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_badges_user ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_challenges_active ON challenges(is_active, end_date);
CREATE INDEX IF NOT EXISTS idx_challenge_progress_user ON user_challenge_progress(user_id);

-- Function to update user rewards summary
CREATE OR REPLACE FUNCTION update_user_rewards_summary()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_rewards_summary (user_id, total_points, current_points)
  VALUES (
    NEW.user_id,
    CASE WHEN NEW.type = 'earn' THEN NEW.points ELSE 0 END,
    NEW.points
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_points = user_rewards_summary.total_points +
      CASE WHEN NEW.type = 'earn' THEN NEW.points ELSE 0 END,
    current_points = user_rewards_summary.current_points + NEW.points,
    last_updated = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update rewards summary
CREATE TRIGGER trigger_update_rewards_summary
AFTER INSERT ON points_transactions
FOR EACH ROW
EXECUTE FUNCTION update_user_rewards_summary();

-- Row Level Security
ALTER TABLE points_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rewards_summary ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own points transactions"
  ON points_transactions FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view own badges"
  ON user_badges FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view own rewards summary"
  ON user_rewards_summary FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view own challenge progress"
  ON user_challenge_progress FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Anyone can view active challenges"
  ON challenges FOR SELECT
  USING (is_active = true);

-- Sample challenges
INSERT INTO challenges (title, description, points_reward, badge_reward, is_active, requirements) VALUES
  ('First Order', 'Complete your first order', 200, NULL, true, '{"orders": 1}'),
  ('Community Star', 'Make 10 community posts', 500, 'community_builder', true, '{"posts": 10}'),
  ('Night Owl', 'Order during golden hours 5 times', 250, 'night_owl', true, '{"night_orders": 5}')
ON CONFLICT DO NOTHING;
```

### Click "RUN" (or press Ctrl+Enter)

You should see: **Success. No rows returned**

## ✅ Step 3: Verify Tables Created

1. Click **Table Editor** in Supabase sidebar
2. You should see these new tables:
   - ✅ points_transactions
   - ✅ user_badges
   - ✅ challenges
   - ✅ user_challenge_progress
   - ✅ user_rewards_summary

## 🎉 Step 4: Test It!

Visit: http://localhost:3456/portal/rewards

The page should now connect to your real Supabase database!

## 🐛 Troubleshooting

**Error: "relation already exists"**
- Tables are already created! You're good to go.

**Error: "permission denied"**
- Make sure you're logged into the correct Supabase project
- Check that you're using the SQL Editor (not the dashboard)

**No data showing in rewards page?**
- That's normal! You haven't earned any points yet.
- The page will show 0 points until you start using the system.

## 🚀 Next Steps

1. **Enable Navigation**: Uncomment line 19 in `src/components/portal-nav.tsx`
2. **Test Points**: Try the demo by visiting the rewards page
3. **Integration**: Add point-earning events to your app (orders, referrals, etc.)

---

**Your Supabase Project**: https://supabase.com/dashboard/project/tkddlvckadxsjxulcqxp

Need help? Check `REWARDS-SETUP-GUIDE.md` for full documentation!
