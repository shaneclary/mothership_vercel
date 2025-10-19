'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/protected-route'
import PortalNav from '@/components/portal-nav'
import { useAppStore } from '@/lib/store'
import { Star, Clock, ThumbsUp, CheckCircle, AlertCircle } from 'lucide-react'

const expertCategories = [
  { id: 'all', label: 'All Topics', icon: '💬' },
  { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
  { id: 'breastfeeding', label: 'Breastfeeding', icon: '🤱' },
  { id: 'sleep', label: 'Sleep', icon: '😴' },
  { id: 'recovery', label: 'Recovery', icon: '💆‍♀️' },
  { id: 'mental-health', label: 'Mental Health', icon: '🧠' },
]

const experts = [
  {
    id: 'dr-chen',
    name: 'Dr. Lisa Chen',
    title: 'Registered Dietitian',
    specialty: 'Postpartum Nutrition',
    avatar: 'LC',
    responseTime: '< 2 hours',
    rating: 4.9,
    reviews: 156
  },
  {
    id: 'doula-maria',
    name: 'Maria Rodriguez',
    title: 'Certified Doula',
    specialty: 'Postpartum Support',
    avatar: 'MR',
    responseTime: '< 4 hours',
    rating: 5.0,
    reviews: 203
  },
  {
    id: 'lactation-sarah',
    name: 'Sarah Thompson',
    title: 'Lactation Consultant',
    specialty: 'Breastfeeding Support',
    avatar: 'ST',
    responseTime: '< 1 hour',
    rating: 4.8,
    reviews: 189
  }
]

const sampleQuestions = [
  {
    id: 1,
    author: 'Anonymous Mom',
    question: 'How can I increase my milk supply naturally?',
    category: 'breastfeeding',
    answered: true,
    expert: 'Sarah Thompson',
    time: '2 hours ago',
    upvotes: 24
  },
  {
    id: 2,
    author: 'Jessica L.',
    question: 'When can I start exercising after C-section?',
    category: 'recovery',
    answered: true,
    expert: 'Maria Rodriguez',
    time: '5 hours ago',
    upvotes: 18
  },
  {
    id: 3,
    author: 'Anonymous Mom',
    question: 'Best foods for postpartum healing?',
    category: 'nutrition',
    answered: true,
    expert: 'Dr. Lisa Chen',
    time: '1 day ago',
    upvotes: 42
  }
]

export default function AskExpertPage() {
  const user = useAppStore((state) => state.user)
  const [activeTab, setActiveTab] = useState('ask')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [questionForm, setQuestionForm] = useState({
    category: '',
    question: '',
    anonymous: false
  })

  const handleSubmitQuestion = () => {
    alert('Your question has been submitted! Our experts will respond within 24 hours.')
    setShowQuestionModal(false)
    setQuestionForm({ category: '', question: '', anonymous: false })
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-cream">
        <PortalNav />

        <main className="flex-1 p-8">
          {/* Header */}
          <h1 className="text-4xl font-bold text-charcoal mb-8">Ask an Expert</h1>

          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 mb-8 text-white shadow-lg">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                🤱
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Expert Support Available</h2>
                <p className="text-white/90 mb-4">
                  Get personalized answers from certified postpartum professionals including doulas, lactation consultants, and nutritionists.
                </p>
                <button
                  onClick={() => setShowQuestionModal(true)}
                  className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Ask a Question
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('ask')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                activeTab === 'ask'
                  ? 'bg-sage text-white'
                  : 'bg-white text-charcoal border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Ask Question
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                activeTab === 'browse'
                  ? 'bg-sage text-white'
                  : 'bg-white text-charcoal border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Browse Q&A
            </button>
            <button
              onClick={() => setActiveTab('experts')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                activeTab === 'experts'
                  ? 'bg-sage text-white'
                  : 'bg-white text-charcoal border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Our Experts
            </button>
          </div>

          {/* Ask Tab */}
          {activeTab === 'ask' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-charcoal mb-6">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-sage text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      1
                    </div>
                    <h3 className="font-bold text-charcoal mb-2">Submit Your Question</h3>
                    <p className="text-sm text-charcoal-70">
                      Choose a category and ask your question (anonymously if you prefer)
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-sage text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      2
                    </div>
                    <h3 className="font-bold text-charcoal mb-2">Expert Reviews</h3>
                    <p className="text-sm text-charcoal-70">
                      One of our certified professionals will review your question
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-sage text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      3
                    </div>
                    <h3 className="font-bold text-charcoal mb-2">Get Your Answer</h3>
                    <p className="text-sm text-charcoal-70">
                      Receive a detailed response within 24 hours via notification
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowQuestionModal(true)}
                className="w-full bg-sage text-white py-4 rounded-xl font-semibold hover:bg-sage-600 transition-colors text-lg"
              >
                Ask Your Question
              </button>
            </div>
          )}

          {/* Browse Q&A Tab */}
          {activeTab === 'browse' && (
            <div className="space-y-6">
              {/* Category Filter */}
              <div className="flex gap-3 overflow-x-auto pb-4">
                {expertCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-sage text-white'
                        : 'bg-white text-charcoal border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {sampleQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-charcoal font-bold flex-shrink-0">
                        👤
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-charcoal">{q.author}</span>
                          <span className="text-sm text-charcoal-60">{q.time}</span>
                        </div>
                        <p className="text-charcoal font-medium mb-3">{q.question}</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="bg-sage/10 text-sage px-3 py-1 rounded-full text-xs font-medium">
                            {q.category}
                          </span>
                          {q.answered && (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Answered by {q.expert}
                            </span>
                          )}
                          <div className="flex items-center gap-1 text-charcoal-60 text-sm">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{q.upvotes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {q.answered && (
                      <button className="mt-4 text-sage font-semibold hover:text-sage-600 transition-colors">
                        View Answer →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experts Tab */}
          {activeTab === 'experts' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <div
                  key={expert.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-sage text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {expert.avatar}
                    </div>
                    <h3 className="font-bold text-lg text-charcoal mb-1">{expert.name}</h3>
                    <p className="text-sm text-charcoal-70 mb-1">{expert.title}</p>
                    <p className="text-sm text-sage font-medium mb-4">{expert.specialty}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{expert.rating}</span>
                        <span className="text-charcoal-60">({expert.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-charcoal-70">
                        <Clock className="w-4 h-4" />
                        <span>Responds {expert.responseTime}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowQuestionModal(true)}
                      className="w-full bg-sage text-white py-3 rounded-xl font-semibold hover:bg-sage-600 transition-colors"
                    >
                      Ask {expert.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Important Note */}
          <div className="mt-8 bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-charcoal mb-2">Medical Disclaimer</h3>
                <p className="text-sm text-charcoal-70">
                  Our experts provide educational information and support, not medical diagnosis or treatment.
                  For medical emergencies or urgent concerns, please contact your healthcare provider immediately.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-charcoal">Ask Your Question</h2>
              <button
                onClick={() => setShowQuestionModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Category *
                </label>
                <select
                  value={questionForm.category}
                  onChange={(e) => setQuestionForm({ ...questionForm, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage"
                >
                  <option value="">Select a category</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="breastfeeding">Breastfeeding</option>
                  <option value="sleep">Sleep</option>
                  <option value="recovery">Recovery</option>
                  <option value="mental-health">Mental Health</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Your Question *
                </label>
                <textarea
                  value={questionForm.question}
                  onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                  placeholder="Describe your question in detail..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={questionForm.anonymous}
                  onChange={(e) => setQuestionForm({ ...questionForm, anonymous: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-sage focus:ring-sage"
                />
                <div>
                  <div className="font-medium text-charcoal">Post Anonymously</div>
                  <div className="text-sm text-charcoal-70">Your name will not be shown with your question</div>
                </div>
              </div>

              <button
                onClick={handleSubmitQuestion}
                className="w-full bg-sage text-white py-4 rounded-xl font-semibold hover:bg-sage-600 transition-colors"
              >
                Submit Question
              </button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  )
}
