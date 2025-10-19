-- MOTHERSHIP REWARDS SYSTEM - SUPABASE DATABASE SCHEMA
-- Run these commands in your Supabase SQL editor when ready to launch rewards

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Points transactions table
CREATE TABLE IF NOT EXISTS points_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL, -- References your auth user ID
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

-- User rewards summary (materialized view for performance)
-- This stores computed totals to avoid scanning all transactions
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

-- Function to update user rewards summary after points transaction
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

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE points_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rewards_summary ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
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

-- Everyone can view active challenges
CREATE POLICY "Anyone can view active challenges"
  ON challenges FOR SELECT
  USING (is_active = true);

-- Sample data for testing
INSERT INTO challenges (title, description, points_reward, badge_reward, is_active, requirements) VALUES
  ('First Order', 'Complete your first order', 200, NULL, true, '{"orders": 1}'),
  ('Community Star', 'Make 10 community posts', 500, 'community_builder', true, '{"posts": 10}'),
  ('Night Owl', 'Order during golden hours 5 times', 250, 'night_owl', true, '{"night_orders": 5}')
ON CONFLICT DO NOTHING;

-- Grant necessary permissions
-- Note: Adjust these based on your Supabase setup
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE ON points_transactions TO authenticated;
GRANT INSERT ON user_badges TO authenticated;
GRANT INSERT, UPDATE ON user_challenge_progress TO authenticated;
GRANT INSERT, UPDATE ON user_rewards_summary TO authenticated;
