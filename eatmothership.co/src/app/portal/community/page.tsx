'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/protected-route'
import PortalNav from '@/components/portal-nav'
import { useAppStore } from '@/lib/store'
import { Bell, ArrowRight, MessageCircle, Users } from 'lucide-react'

const communityChannels = [
  {
    id: 'general',
    name: 'General Chat',
    description: 'Connect with other mothers in the community',
    icon: '💬',
    memberCount: 247,
    lastActivity: '2 mins ago'
  },
  {
    id: 'first-time-moms',
    name: 'First Time Moms',
    description: 'Support group for new mothers navigating their first postpartum',
    icon: '👶',
    memberCount: 132,
    lastActivity: '5 mins ago'
  },
  {
    id: 'breastfeeding',
    name: 'Breastfeeding Support',
    description: 'Tips, questions, and support for breastfeeding mothers',
    icon: '🤱',
    memberCount: 189,
    lastActivity: '12 mins ago'
  },
  {
    id: 'sleep-solutions',
    name: 'Sleep Solutions',
    description: 'Share tips and get support for baby sleep challenges',
    icon: '😴',
    memberCount: 156,
    lastActivity: '18 mins ago'
  },
  {
    id: 'postpartum-wellness',
    name: 'Postpartum Wellness',
    description: 'Mental and physical health support during recovery',
    icon: '💆‍♀️',
    memberCount: 178,
    lastActivity: '25 mins ago'
  },
  {
    id: 'meal-ideas',
    name: 'Meal Ideas & Recipes',
    description: 'Share and discover nourishing meal ideas',
    icon: '🍲',
    memberCount: 203,
    lastActivity: '1 hour ago'
  }
]

const recentMessages = [
  {
    id: 1,
    channel: 'general',
    author: 'Emily R.',
    avatar: 'E',
    message: 'Just tried the Golden Bone Broth and it was amazing! 😍',
    time: '2 mins ago',
    replies: 5
  },
  {
    id: 2,
    channel: 'first-time-moms',
    author: 'Sarah M.',
    avatar: 'S',
    message: 'Does anyone else feel completely overwhelmed? Week 2 here...',
    time: '5 mins ago',
    replies: 12
  },
  {
    id: 3,
    channel: 'breastfeeding',
    author: 'Jessica L.',
    avatar: 'J',
    message: 'The lactation tea is a game changer! Highly recommend 🙌',
    time: '12 mins ago',
    replies: 8
  },
  {
    id: 4,
    channel: 'sleep-solutions',
    author: 'Maria G.',
    avatar: 'M',
    message: 'Finally got 4 hours of sleep last night! Progress! 🎉',
    time: '18 mins ago',
    replies: 15
  }
]

export default function CommunityPage() {
  const user = useAppStore((state) => state.user)
  const [activeTab, setActiveTab] = useState('channels')

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-cream">
        <PortalNav />

        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-charcoal">Community</h1>
            <button className="p-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-charcoal" />
            </button>
          </div>

          {/* Welcome Banner */}
          <div className="bg-gradient-to-br from-sage to-sage-600 rounded-3xl p-8 mb-8 text-white shadow-lg">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                👋
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Welcome, {user?.firstName}!</h2>
                <p className="text-white/90 mb-4">Connect with our community of mothers</p>
              </div>
            </div>
            <p className="text-white/80 text-sm mt-4">
              247 members online • Share your journey, ask questions, and support each other
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('channels')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                activeTab === 'channels'
                  ? 'bg-sage text-white'
                  : 'bg-white text-charcoal border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Channels
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                activeTab === 'recent'
                  ? 'bg-sage text-white'
                  : 'bg-white text-charcoal border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Recent Activity
            </button>
          </div>

          {/* Channels Tab */}
          {activeTab === 'channels' && (
            <div className="space-y-4">
              {communityChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                        {channel.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-lg text-charcoal">{channel.name}</h3>
                          <span className="text-xs text-charcoal-60">{channel.lastActivity}</span>
                        </div>
                        <p className="text-charcoal-70 text-sm mb-3">{channel.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-charcoal-60">
                            <Users className="w-4 h-4" />
                            <span>{channel.memberCount} members</span>
                          </div>
                          <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            Active
                          </div>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-sage group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recent Activity Tab */}
          {activeTab === 'recent' && (
            <div className="space-y-4">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {msg.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-charcoal">{msg.author}</span>
                        <span className="text-sm text-charcoal-60">{msg.time}</span>
                      </div>
                      <p className="text-charcoal-70 mb-3">{msg.message}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="bg-sage/10 text-sage px-3 py-1 rounded-full text-xs font-medium">
                          #{msg.channel}
                        </span>
                        <div className="flex items-center gap-1 text-charcoal-60">
                          <MessageCircle className="w-4 h-4" />
                          <span>{msg.replies} replies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Community Guidelines */}
          <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="font-bold text-charcoal mb-4 flex items-center gap-2">
              📋 Community Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-charcoal-70">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Be kind, supportive, and respectful to all members</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>No medical advice - direct health questions to &quot;Ask a Doula&quot;</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Respect privacy - no sharing of personal information</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Report inappropriate content to moderators</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
