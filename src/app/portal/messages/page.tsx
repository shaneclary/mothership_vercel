'use client'

import { useState, useRef, useEffect } from 'react'
import ProtectedRoute from '@/components/protected-route'
import PortalNav from '@/components/portal-nav'
import { useAppStore } from '@/lib/store'
import {
  MessageCircle,
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Lock,
  Flag,
  UserPlus,
  Users,
  Bell,
  BellOff,
  Archive,
  Trash2,
  Info,
  X,
  AlertTriangle,
  AtSign
} from 'lucide-react'

// Mock data for conversations
const mockConversations = [
  {
    id: '1',
    name: 'Sarah Chen',
    username: 'sarah_chen',
    avatar: '👩‍⚕️',
    lastMessage: 'Thanks for the recipe recommendation!',
    timestamp: '2:30 PM',
    unread: 2,
    isGroup: false,
    isOnline: true
  },
  {
    id: '2',
    name: 'Postpartum Support Group',
    username: 'postpartum_support',
    avatar: '🤱',
    lastMessage: '@maria_s: I found a great resource...',
    timestamp: 'Yesterday',
    unread: 0,
    isGroup: true,
    memberCount: 12
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    username: 'emily_r',
    avatar: '👩',
    lastMessage: 'The bone broth was amazing!',
    timestamp: 'Monday',
    unread: 0,
    isGroup: false,
    isOnline: false
  }
]

// Mock users for @ mention suggestions
const mockUsers = [
  { id: '1', name: 'Sarah Chen', username: 'sarah_chen', avatar: '👩‍⚕️' },
  { id: '2', name: 'Emily Rodriguez', username: 'emily_r', avatar: '👩' },
  { id: '3', name: 'Maria Santos', username: 'maria_s', avatar: '👩‍🦱' },
  { id: '4', name: 'Jennifer Lee', username: 'jenn_lee', avatar: '👩‍🦰' },
  { id: '5', name: 'Amanda Brown', username: 'amanda_b', avatar: '👩‍🦳' },
]

// Mock messages for the selected conversation
const mockMessages = [
  {
    id: '1',
    senderId: '2',
    senderName: 'Sarah Chen',
    senderUsername: 'sarah_chen',
    content: 'Hi! I just received my first delivery and everything looks amazing!',
    timestamp: new Date('2025-10-18T10:30:00'),
    isRead: true,
    isDelivered: true
  },
  {
    id: '2',
    senderId: 'me',
    senderName: 'Me',
    senderUsername: 'sarah_j',
    content: 'That\'s wonderful! Which meal are you most excited to try?',
    timestamp: new Date('2025-10-18T10:32:00'),
    isRead: true,
    isDelivered: true
  },
  {
    id: '3',
    senderId: '2',
    senderName: 'Sarah Chen',
    senderUsername: 'sarah_chen',
    content: 'Definitely the golden turmeric chicken soup! Do you have any serving suggestions?',
    timestamp: new Date('2025-10-18T10:35:00'),
    isRead: true,
    isDelivered: true
  },
  {
    id: '4',
    senderId: 'me',
    senderName: 'Me',
    senderUsername: 'sarah_j',
    content: 'I love adding a squeeze of fresh lemon and some crusty bread on the side. It makes such a comforting meal!',
    timestamp: new Date('2025-10-18T14:20:00'),
    isRead: true,
    isDelivered: true
  },
  {
    id: '5',
    senderId: '2',
    senderName: 'Sarah Chen',
    senderUsername: 'sarah_chen',
    content: 'Thanks @sarah_j for the recipe recommendation!',
    timestamp: new Date('2025-10-18T14:30:00'),
    isRead: false,
    isDelivered: true,
    mentions: ['sarah_j']
  }
]

export default function MessagesPage() {
  const user = useAppStore((state) => state.user)
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1')
  const [messageText, setMessageText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [showConversationInfo, setShowConversationInfo] = useState(false)
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false)
  const [mentionQuery, setMentionQuery] = useState('')
  const [cursorPosition, setCursorPosition] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const conversation = mockConversations.find(c => c.id === selectedConversation)
  const messages = selectedConversation ? mockMessages : []

  // Filter conversations by search (username or name)
  const filteredConversations = mockConversations.filter(conv => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      conv.name.toLowerCase().includes(query) ||
      conv.username.toLowerCase().includes(query) ||
      (query.startsWith('@') && conv.username.toLowerCase().includes(query.slice(1)))
    )
  })

  // Filter users for mention suggestions
  const mentionSuggestions = mockUsers.filter(u =>
    u.username.toLowerCase().includes(mentionQuery.toLowerCase()) ||
    u.name.toLowerCase().includes(mentionQuery.toLowerCase())
  ).slice(0, 5)

  // Handle text change and detect @ mentions
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    const cursor = e.target.selectionStart
    setMessageText(text)
    setCursorPosition(cursor)

    // Find @ mention being typed
    const textBeforeCursor = text.slice(0, cursor)
    const match = textBeforeCursor.match(/@(\w*)$/)

    if (match) {
      setMentionQuery(match[1])
      setShowMentionSuggestions(true)
    } else {
      setShowMentionSuggestions(false)
      setMentionQuery('')
    }
  }

  // Insert mention
  const insertMention = (username: string) => {
    const textBeforeCursor = messageText.slice(0, cursorPosition)
    const textAfterCursor = messageText.slice(cursorPosition)
    const beforeMention = textBeforeCursor.replace(/@\w*$/, `@${username} `)
    const newText = beforeMention + textAfterCursor
    setMessageText(newText)
    setShowMentionSuggestions(false)
    setMentionQuery('')

    // Focus back on textarea
    setTimeout(() => {
      textareaRef.current?.focus()
      const newCursorPos = beforeMention.length
      textareaRef.current?.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message via API
      console.log('Sending message:', messageText)
      setMessageText('')
    }
  }

  const handleReportUser = () => {
    if (reportReason.trim()) {
      console.log('Reporting user with reason:', reportReason)
      setShowReportModal(false)
      setReportReason('')
      alert('Thank you for your report. Our team will review it shortly.')
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // Highlight @mentions in message content
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(@\w+)/g)
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span key={index} className="font-semibold bg-sage-green/20 px-1 rounded">
            {part}
          </span>
        )
      }
      return part
    })
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-cream">
        <PortalNav />

        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-charcoal mb-1 flex items-center gap-2">
                  <MessageCircle className="w-8 h-8 text-sage-green" />
                  Messages
                </h1>
                <p className="text-charcoal-70 text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  End-to-end encrypted
                  {user?.username && (
                    <>
                      <span className="mx-2">•</span>
                      <AtSign className="w-4 h-4" />
                      <span className="font-medium">@{user.username}</span>
                    </>
                  )}
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-sage-green text-white rounded-xl font-semibold hover:bg-sage-700 transition-colors">
                <UserPlus className="w-5 h-5" />
                New Message
              </button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Conversations List */}
            <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name or @username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-sage-green"
                  />
                </div>
                {searchQuery && (
                  <p className="text-xs text-gray-500 mt-2">
                    {filteredConversations.length} result{filteredConversations.length !== 1 ? 's' : ''} found
                  </p>
                )}
              </div>

              {/* Conversation List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                      selectedConversation === conv.id ? 'bg-sage-green/5' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-sage-green/10 flex items-center justify-center text-2xl">
                        {conv.avatar}
                      </div>
                      {!conv.isGroup && conv.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-baseline justify-between mb-1">
                        <div>
                          <h3 className="font-semibold text-charcoal truncate">
                            {conv.name}
                            {conv.isGroup && (
                              <span className="ml-2 text-xs text-gray-500">({conv.memberCount})</span>
                            )}
                          </h3>
                          <p className="text-xs text-gray-500">@{conv.username}</p>
                        </div>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{conv.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <span className="ml-2 flex-shrink-0 w-5 h-5 bg-sage-green text-white text-xs rounded-full flex items-center justify-center">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            {selectedConversation && conversation ? (
              <div className="flex-1 flex flex-col bg-gradient-to-br from-cream to-blush/20 relative">
                {/* Chat Header */}
                <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sage-green/10 flex items-center justify-center text-xl">
                      {conversation.avatar}
                    </div>
                    <div>
                      <h2 className="font-bold text-charcoal">{conversation.name}</h2>
                      <p className="text-xs text-gray-500">
                        @{conversation.username}
                        {!conversation.isGroup && (
                          <> • {conversation.isOnline ? 'Online' : 'Offline'}</>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Video className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setShowConversationInfo(!showConversationInfo)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Info className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg) => {
                    const isMe = msg.senderId === 'me'
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md ${isMe ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`rounded-2xl px-4 py-2 ${
                              isMe
                                ? 'bg-sage-green text-white rounded-tr-sm'
                                : 'bg-white text-charcoal rounded-tl-sm shadow-sm'
                            }`}
                          >
                            <p className="text-sm">{renderMessageContent(msg.content)}</p>
                          </div>
                          <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <span>{formatTimestamp(msg.timestamp)}</span>
                            {isMe && (
                              <span className="ml-1">
                                {msg.isRead ? (
                                  <CheckCheck className="w-4 h-4 text-blue-500" />
                                ) : msg.isDelivered ? (
                                  <CheckCheck className="w-4 h-4" />
                                ) : (
                                  <Check className="w-4 h-4" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Message Input */}
                <div className="bg-white border-t border-gray-200 p-4 relative">
                  {/* Mention Suggestions */}
                  {showMentionSuggestions && mentionSuggestions.length > 0 && (
                    <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden max-h-60 overflow-y-auto">
                      <div className="p-2 bg-gray-50 border-b border-gray-200">
                        <p className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                          <AtSign className="w-4 h-4" />
                          Mention someone
                        </p>
                      </div>
                      {mentionSuggestions.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => insertMention(user.username)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-sage-green/5 transition-colors text-left"
                        >
                          <div className="w-10 h-10 rounded-full bg-sage-green/10 flex items-center justify-center text-xl">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-charcoal text-sm">{user.name}</p>
                            <p className="text-xs text-gray-500">@{user.username}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-end gap-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Paperclip className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex-1 relative">
                      <textarea
                        ref={textareaRef}
                        value={messageText}
                        onChange={handleTextChange}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey && !showMentionSuggestions) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        placeholder="Type a message... Use @ to mention someone"
                        rows={1}
                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:border-sage-green resize-none"
                      />
                      <button className="absolute right-2 bottom-2 p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <Smile className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="p-3 bg-sage-green text-white rounded-xl hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-cream to-blush/20">
                <div className="text-center">
                  <MessageCircle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Select a conversation to start messaging</p>
                  <p className="text-gray-400 text-sm mt-2">Search by name or @username</p>
                </div>
              </div>
            )}

            {/* Conversation Info Sidebar */}
            {showConversationInfo && selectedConversation && conversation && (
              <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-charcoal">Conversation Info</h3>
                    <button
                      onClick={() => setShowConversationInfo(false)}
                      className="p-1 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Profile */}
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-sage-green/10 flex items-center justify-center text-4xl mx-auto mb-3">
                      {conversation.avatar}
                    </div>
                    <h4 className="font-bold text-charcoal text-lg">{conversation.name}</h4>
                    <p className="text-sm text-sage-green">@{conversation.username}</p>
                    {conversation.isGroup && (
                      <p className="text-sm text-gray-500 mt-1">{conversation.memberCount} members</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 mb-6">
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <span className="text-charcoal">Mute notifications</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                      <Archive className="w-5 h-5 text-gray-600" />
                      <span className="text-charcoal">Archive conversation</span>
                    </button>
                    <button
                      onClick={() => setShowReportModal(true)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-xl transition-colors text-red-600"
                    >
                      <Flag className="w-5 h-5" />
                      <span>Report user</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-xl transition-colors text-red-600">
                      <Trash2 className="w-5 h-5" />
                      <span>Delete conversation</span>
                    </button>
                  </div>

                  {/* Privacy Info */}
                  <div className="bg-sage-green/5 rounded-xl p-4 border border-sage-green/20">
                    <div className="flex items-start gap-2 mb-2">
                      <Lock className="w-4 h-4 text-sage-green mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-sage-green mb-1">End-to-end encrypted</p>
                        <p className="text-xs text-charcoal-70">
                          Your messages are secured with end-to-end encryption. Only you and the recipient can read them.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-fade-in-scale">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-charcoal">Report User</h3>
                <p className="text-sm text-charcoal-70">Help us keep the community safe</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Reason for reporting
              </label>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sage-green mb-3"
              >
                <option value="">Select a reason...</option>
                <option value="spam">Spam or unwanted messages</option>
                <option value="harassment">Harassment or bullying</option>
                <option value="inappropriate">Inappropriate content</option>
                <option value="impersonation">Impersonation</option>
                <option value="safety">Safety concern</option>
                <option value="other">Other</option>
              </select>

              <textarea
                placeholder="Additional details (optional)"
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sage-green resize-none"
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
              <p className="text-xs text-amber-800">
                <strong>Note:</strong> Reports are reviewed by our team within 24 hours. We take all reports seriously and will take appropriate action.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowReportModal(false)
                  setReportReason('')
                }}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-semibold text-charcoal hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReportUser}
                disabled={!reportReason}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  )
}
