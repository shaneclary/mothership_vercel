'use client'

import { useState, useMemo } from 'react'
import ProtectedRoute from '@/components/protected-route'
import PortalNav from '@/components/portal-nav'
import { Calendar, Clock, MapPin, Users, CheckCircle, Search, Filter, X, ChevronDown, Bookmark, BookmarkCheck, Play, MapPinned, Sparkles } from 'lucide-react'

// Event type definitions
type EventType = 'workshop' | 'support-circle' | 'nutrition' | 'cooking' | 'mindfulness' | 'fitness'
type EventFormat = 'virtual' | 'in-person'
type EventStatus = 'upcoming' | 'past'

interface Event {
  id: string
  title: string
  date: string
  dateObj: Date
  time: string
  location: string
  locationZip?: string
  spots: string | null
  instructor: string
  description: string
  registered: boolean
  saved: boolean
  type: EventType
  format: EventFormat
  recording?: boolean
  status: EventStatus
  popularity: number
}

// Comprehensive mock data
const allEvents: Event[] = [
  {
    id: '1',
    title: 'Postpartum Nutrition Workshop',
    date: 'November 25, 2025',
    dateObj: new Date('2025-11-25'),
    time: '2:00 PM - 3:30 PM PST',
    location: 'Virtual (Zoom)',
    spots: '12 spots left',
    instructor: 'Dr. Sarah Martinez',
    description: 'Learn about optimal nutrition during the postpartum period and healing foods',
    registered: false,
    saved: true,
    type: 'nutrition',
    format: 'virtual',
    status: 'upcoming',
    popularity: 95,
  },
  {
    id: '2',
    title: 'Meal Prep Masterclass',
    date: 'November 28, 2025',
    dateObj: new Date('2025-11-28'),
    time: '10:00 AM - 11:30 AM PST',
    location: 'Virtual (Zoom)',
    spots: '8 spots left',
    instructor: 'Chef Maria Thompson',
    description: 'Efficient meal prep strategies for new parents - batch cooking, freezer meals',
    registered: true,
    saved: true,
    type: 'cooking',
    format: 'virtual',
    status: 'upcoming',
    popularity: 88,
  },
  {
    id: '3',
    title: 'New Parent Support Circle',
    date: 'December 2, 2025',
    dateObj: new Date('2025-12-02'),
    time: '6:00 PM - 7:00 PM PST',
    location: 'Virtual (Zoom)',
    spots: '20 spots left',
    instructor: 'Lisa Chen',
    description: 'Connect with other parents and share experiences in a safe, supportive space',
    registered: false,
    saved: false,
    type: 'support-circle',
    format: 'virtual',
    status: 'upcoming',
    popularity: 92,
  },
  {
    id: '4',
    title: 'Mindful Movement for Moms',
    date: 'December 5, 2025',
    dateObj: new Date('2025-12-05'),
    time: '9:00 AM - 10:00 AM PST',
    location: 'Venice Beach Studio, 90291',
    locationZip: '90291',
    spots: '6 spots left',
    instructor: 'Jessica Rivers',
    description: 'Gentle yoga and meditation practices designed for postpartum recovery',
    registered: false,
    saved: false,
    type: 'mindfulness',
    format: 'in-person',
    status: 'upcoming',
    popularity: 78,
  },
  {
    id: '5',
    title: 'Broth & Bone Making Workshop',
    date: 'December 8, 2025',
    dateObj: new Date('2025-12-08'),
    time: '1:00 PM - 3:00 PM PST',
    location: 'Santa Monica Kitchen, 90405',
    locationZip: '90405',
    spots: '10 spots left',
    instructor: 'Chef Maria Thompson',
    description: 'Hands-on cooking class teaching traditional bone broth and nourishing broths',
    registered: true,
    saved: true,
    type: 'cooking',
    format: 'in-person',
    status: 'upcoming',
    popularity: 85,
  },
  {
    id: '6',
    title: 'Postpartum Fitness Fundamentals',
    date: 'December 12, 2025',
    dateObj: new Date('2025-12-12'),
    time: '11:00 AM - 12:00 PM PST',
    location: 'Virtual (Zoom)',
    spots: '15 spots left',
    instructor: 'Rachel Kim',
    description: 'Safe exercises to rebuild core strength after pregnancy',
    registered: false,
    saved: false,
    type: 'fitness',
    format: 'virtual',
    status: 'upcoming',
    popularity: 81,
  },
  {
    id: '7',
    title: 'Freezer Cooking Workshop',
    date: 'October 10, 2025',
    dateObj: new Date('2025-10-10'),
    time: '10:00 AM - 11:30 AM PST',
    location: 'Virtual (Zoom)',
    spots: null,
    instructor: 'Chef Maria Thompson',
    description: 'Learn how to prepare and freeze meals for new parents',
    registered: false,
    saved: false,
    type: 'cooking',
    format: 'virtual',
    recording: true,
    status: 'past',
    popularity: 90,
  },
  {
    id: '8',
    title: 'Sleep & Nutrition Connection',
    date: 'October 5, 2025',
    dateObj: new Date('2025-10-05'),
    time: '7:00 PM - 8:00 PM PST',
    location: 'Virtual (Zoom)',
    spots: null,
    instructor: 'Dr. Sarah Martinez',
    description: 'Understanding how nutrition affects sleep for you and baby',
    registered: false,
    saved: false,
    type: 'nutrition',
    format: 'virtual',
    recording: true,
    status: 'past',
    popularity: 87,
  },
  {
    id: '9',
    title: 'Self-Care for New Moms',
    date: 'September 28, 2025',
    dateObj: new Date('2025-09-28'),
    time: '3:00 PM - 4:00 PM PST',
    location: 'Virtual (Zoom)',
    spots: null,
    instructor: 'Lisa Chen',
    description: 'Practical self-care strategies that fit into your busy schedule',
    registered: false,
    saved: false,
    type: 'mindfulness',
    format: 'virtual',
    recording: true,
    status: 'past',
    popularity: 93,
  },
]

const eventTypeLabels: Record<EventType, string> = {
  'workshop': 'Workshop',
  'support-circle': 'Support Circle',
  'nutrition': 'Nutrition',
  'cooking': 'Cooking',
  'mindfulness': 'Mindfulness',
  'fitness': 'Fitness',
}

const eventTypeIcons: Record<EventType, string> = {
  'workshop': '🎓',
  'support-circle': '❤️',
  'nutrition': '🥗',
  'cooking': '👩‍🍳',
  'mindfulness': '🧘‍♀️',
  'fitness': '💪',
}

type SortOption = 'soonest' | 'popular' | 'recent' | 'registered'

export default function EventsPage() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([])
  const [selectedFormats, setSelectedFormats] = useState<EventFormat[]>([])
  const [selectedInstructor, setSelectedInstructor] = useState<string>('')
  const [showFilterDrawer, setShowFilterDrawer] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('soonest')
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [viewMode, setViewMode] = useState<'all' | 'saved' | 'registered'>('all')
  const [showPastEvents, setShowPastEvents] = useState(false)
  const [locationZip, setLocationZip] = useState('')
  const [radiusMiles, setRadiusMiles] = useState(25)

  // Search suggestions state
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [searchTags, setSearchTags] = useState<string[]>([])

  // Get unique instructors
  const instructors = useMemo(() => {
    return Array.from(new Set(allEvents.map(e => e.instructor))).sort()
  }, [])

  // Search suggestions based on query
  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return []

    const query = searchQuery.toLowerCase()
    const suggestions: { type: 'event' | 'instructor' | 'topic', text: string, id?: string }[] = []

    // Event title suggestions
    allEvents.forEach(event => {
      if (event.title.toLowerCase().includes(query)) {
        suggestions.push({ type: 'event', text: event.title, id: event.id })
      }
    })

    // Instructor suggestions
    instructors.forEach(instructor => {
      if (instructor.toLowerCase().includes(query)) {
        suggestions.push({ type: 'instructor', text: instructor })
      }
    })

    // Topic/keyword suggestions from descriptions
    const topics = ['meal prep', 'nutrition', 'support', 'cooking', 'mindfulness', 'fitness', 'broth', 'sleep']
    topics.forEach(topic => {
      if (topic.includes(query) && !searchTags.includes(topic)) {
        suggestions.push({ type: 'topic', text: topic })
      }
    })

    return suggestions.slice(0, 8)
  }, [searchQuery, instructors, searchTags])

  // Filtered and sorted events
  const filteredEvents = useMemo(() => {
    let filtered = allEvents

    // View mode filter (saved/registered)
    if (viewMode === 'saved') {
      filtered = filtered.filter(e => e.saved)
    } else if (viewMode === 'registered') {
      filtered = filtered.filter(e => e.registered)
    }

    // Past/upcoming filter
    if (!showPastEvents) {
      filtered = filtered.filter(e => e.status === 'upcoming')
    }

    // Type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(e => selectedTypes.includes(e.type))
    }

    // Format filter
    if (selectedFormats.length > 0) {
      filtered = filtered.filter(e => selectedFormats.includes(e.format))
    }

    // Instructor filter
    if (selectedInstructor) {
      filtered = filtered.filter(e => e.instructor === selectedInstructor)
    }

    // Location/zip filter for in-person events
    if (locationZip && locationZip.length === 5) {
      filtered = filtered.filter(e => {
        if (e.format === 'virtual') return true
        if (!e.locationZip) return false
        // Simple zip proximity check (in reality, would use geolocation API)
        const eventZipNum = parseInt(e.locationZip)
        const searchZipNum = parseInt(locationZip)
        const zipDiff = Math.abs(eventZipNum - searchZipNum)
        // Rough approximation: ~100 zip codes per 25 miles in LA area
        const zipRange = (radiusMiles / 25) * 100
        return zipDiff <= zipRange
      })
    }

    // Search query and tags filter
    if (searchQuery || searchTags.length > 0) {
      const allSearchTerms = [...searchTags, searchQuery].filter(Boolean)
      filtered = filtered.filter(e => {
        const searchText = `${e.title} ${e.description} ${e.instructor}`.toLowerCase()
        return allSearchTerms.some(term => searchText.includes(term.toLowerCase()))
      })
    }

    // Sort
    if (sortBy === 'soonest') {
      filtered.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.popularity - a.popularity)
    } else if (sortBy === 'recent') {
      filtered.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime())
    } else if (sortBy === 'registered') {
      filtered.sort((a, b) => {
        if (a.registered && !b.registered) return -1
        if (!a.registered && b.registered) return 1
        return a.dateObj.getTime() - b.dateObj.getTime()
      })
    }

    return filtered
  }, [allEvents, viewMode, showPastEvents, selectedTypes, selectedFormats, selectedInstructor, locationZip, radiusMiles, searchQuery, searchTags, sortBy])

  const activeFiltersCount = selectedTypes.length + selectedFormats.length + (selectedInstructor ? 1 : 0) + (locationZip ? 1 : 0)

  const handleToggleType = (type: EventType) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const handleToggleFormat = (format: EventFormat) => {
    setSelectedFormats(prev =>
      prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
    )
  }

  const handleClearFilters = () => {
    setSelectedTypes([])
    setSelectedFormats([])
    setSelectedInstructor('')
    setLocationZip('')
    setRadiusMiles(25)
  }

  const handleAddSearchTag = (tag: string) => {
    if (!searchTags.includes(tag)) {
      setSearchTags([...searchTags, tag])
    }
    setSearchQuery('')
    setShowSearchSuggestions(false)
  }

  const handleRemoveSearchTag = (tag: string) => {
    setSearchTags(searchTags.filter(t => t !== tag))
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen relative overflow-hidden" style={{ backgroundColor: '#F9F6F1' }}>
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sage-green rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blush rounded-full blur-3xl" />
        </div>

        <PortalNav />

        <main className="flex-1 p-8 relative z-10">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-5xl font-bold text-sage-green mb-3 font-cedarville">
                  Events & Workshops
                </h1>
                <p className="text-gray-600 text-lg">
                  Join live workshops and connect with the Mothership community
                </p>
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilterDrawer(!showFilterDrawer)}
                className="flex items-center gap-2 px-6 py-3 backdrop-blur-xl bg-white/90 hover:bg-white border border-sage-green/20 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl relative"
              >
                <Filter className="w-5 h-5 text-sage-green" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-terracotta text-white rounded-full text-xs font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Filter Drawer */}
          {showFilterDrawer && (
            <div className="mb-8 backdrop-blur-xl bg-white/95 rounded-2xl p-6 shadow-xl border border-sage-green/20 animate-fade-in-scale">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-charcoal">Filter Events</h3>
                <div className="flex items-center gap-3">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={handleClearFilters}
                      className="text-sm text-sage-green hover:text-sage-700 font-semibold"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilterDrawer(false)}
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">Event Type</label>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(eventTypeLabels) as EventType[]).map(type => (
                      <button
                        key={type}
                        onClick={() => handleToggleType(type)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${
                          selectedTypes.includes(type)
                            ? 'bg-sage-green text-white shadow-md'
                            : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                        }`}
                      >
                        <span className="mr-1">{eventTypeIcons[type]}</span>
                        {eventTypeLabels[type]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format Filter */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">Format</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleToggleFormat('virtual')}
                      className={`px-4 py-2 rounded-xl font-medium transition-all ${
                        selectedFormats.includes('virtual')
                          ? 'bg-sage-green text-white shadow-md'
                          : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                      }`}
                    >
                      💻 Virtual
                    </button>
                    <button
                      onClick={() => handleToggleFormat('in-person')}
                      className={`px-4 py-2 rounded-xl font-medium transition-all ${
                        selectedFormats.includes('in-person')
                          ? 'bg-sage-green text-white shadow-md'
                          : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                      }`}
                    >
                      📍 In-Person
                    </button>
                  </div>
                </div>

                {/* Instructor Filter */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">Instructor</label>
                  <select
                    value={selectedInstructor}
                    onChange={(e) => setSelectedInstructor(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none focus:ring-2 focus:ring-sage-green transition-all"
                  >
                    <option value="">All Instructors</option>
                    {instructors.map(instructor => (
                      <option key={instructor} value={instructor}>{instructor}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">
                    Location (for in-person events)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Enter ZIP code"
                      value={locationZip}
                      onChange={(e) => setLocationZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                      className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none focus:ring-2 focus:ring-sage-green transition-all"
                      maxLength={5}
                    />
                    {locationZip.length === 5 && (
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-charcoal-70">Within:</label>
                        <select
                          value={radiusMiles}
                          onChange={(e) => setRadiusMiles(parseInt(e.target.value))}
                          className="flex-1 px-3 py-2 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-sage-green text-sm"
                        >
                          <option value={10}>10 miles</option>
                          <option value={25}>25 miles</option>
                          <option value={50}>50 miles</option>
                          <option value={100}>100 miles</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Bar with Smart Tags */}
          <div className="mb-6 animate-fade-in-scale">
            <div className="relative">
              <div className="backdrop-blur-xl bg-white/90 rounded-2xl shadow-lg border border-white/20 p-4">
                {/* Search Tags */}
                {searchTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {searchTags.map(tag => (
                      <div
                        key={tag}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-sage-green/10 text-sage-green rounded-full text-sm font-medium"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => handleRemoveSearchTag(tag)}
                          className="hover:bg-sage-green/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by topic, instructor, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSearchSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                    className="w-full pl-12 pr-6 py-3 bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green text-lg"
                  />
                </div>

                {/* Search Suggestions */}
                {showSearchSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 backdrop-blur-xl bg-white/95 rounded-xl shadow-xl border border-sage-green/20 overflow-hidden z-20">
                    {searchSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddSearchTag(suggestion.text)}
                        className="w-full px-4 py-3 text-left hover:bg-sage-green/10 transition-colors flex items-center gap-3"
                      >
                        {suggestion.type === 'event' && <Calendar className="w-4 h-4 text-sage-green" />}
                        {suggestion.type === 'instructor' && <Users className="w-4 h-4 text-terracotta" />}
                        {suggestion.type === 'topic' && <Sparkles className="w-4 h-4 text-blush" />}
                        <div>
                          <div className="font-medium text-charcoal">{suggestion.text}</div>
                          <div className="text-xs text-gray-500 capitalize">{suggestion.type}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* View Mode Tabs & Sort */}
          <div className="mb-6 flex items-center justify-between gap-4">
            {/* View Mode Tabs */}
            <div className="backdrop-blur-xl bg-white/90 rounded-xl p-1 shadow-lg border border-white/20 inline-flex">
              <button
                onClick={() => setViewMode('all')}
                className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                  viewMode === 'all'
                    ? 'bg-sage-green text-white shadow-md'
                    : 'text-charcoal hover:bg-sage-green/10'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setViewMode('saved')}
                className={`px-5 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  viewMode === 'saved'
                    ? 'bg-sage-green text-white shadow-md'
                    : 'text-charcoal hover:bg-sage-green/10'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                Saved
              </button>
              <button
                onClick={() => setViewMode('registered')}
                className={`px-5 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  viewMode === 'registered'
                    ? 'bg-sage-green text-white shadow-md'
                    : 'text-charcoal hover:bg-sage-green/10'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                Registered
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-5 py-3 backdrop-blur-xl bg-white/90 hover:bg-white border border-sage-green/20 rounded-xl font-semibold transition-all shadow-lg"
              >
                <span className="text-sm text-charcoal-70">Sort:</span>
                <span>
                  {sortBy === 'soonest' && 'Soonest'}
                  {sortBy === 'popular' && 'Most Popular'}
                  {sortBy === 'recent' && 'Recently Added'}
                  {sortBy === 'registered' && 'Registered First'}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showSortMenu && (
                <div className="absolute top-full right-0 mt-2 backdrop-blur-xl bg-white/95 rounded-xl shadow-xl border border-sage-green/20 overflow-hidden z-20 min-w-[200px]">
                  {(['soonest', 'popular', 'recent', 'registered'] as SortOption[]).map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option)
                        setShowSortMenu(false)
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-sage-green/10 transition-colors ${
                        sortBy === option ? 'bg-sage-green/10 text-sage-green font-semibold' : 'text-charcoal'
                      }`}
                    >
                      {option === 'soonest' && 'Soonest'}
                      {option === 'popular' && 'Most Popular'}
                      {option === 'recent' && 'Recently Added'}
                      {option === 'registered' && 'Registered First'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Category Chips */}
          <div className="mb-6 flex flex-wrap gap-3">
            {(Object.keys(eventTypeLabels) as EventType[]).map(type => (
              <button
                key={type}
                onClick={() => handleToggleType(type)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 ${
                  selectedTypes.includes(type)
                    ? 'bg-gradient-to-r from-sage-green to-sage-700 text-white'
                    : 'backdrop-blur-xl bg-white/90 text-charcoal hover:bg-white border border-white/20'
                }`}
              >
                <span className="mr-2">{eventTypeIcons[type]}</span>
                {eventTypeLabels[type]}
              </button>
            ))}
          </div>

          {/* Personalized Feed Message */}
          {(selectedTypes.length > 0 || searchTags.length > 0 || viewMode !== 'all') && (
            <div className="mb-6 backdrop-blur-xl bg-sage-green/10 border border-sage-green/30 rounded-xl p-4 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-sage-green flex-shrink-0" />
              <p className="text-sm text-charcoal">
                {viewMode === 'saved' && 'Showing your saved events for easy access'}
                {viewMode === 'registered' && 'Showing events you\'re registered for'}
                {viewMode === 'all' && 'Showing events tailored to your postpartum journey'}
              </p>
            </div>
          )}

          {/* Events Grid */}
          {filteredEvents.filter(e => e.status === 'upcoming').length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-charcoal mb-4">
                {viewMode === 'all' ? 'Upcoming Events' :
                 viewMode === 'saved' ? 'Your Saved Events' :
                 'Your Registered Events'}
              </h2>
              <div className="space-y-4 mb-8">
                {filteredEvents.filter(e => e.status === 'upcoming').map((event) => (
                  <div
                    key={event.id}
                    className="backdrop-blur-xl bg-white/90 rounded-2xl p-6 shadow-lg border border-sage-green/20 hover:shadow-xl transition-all duration-300 animate-fade-in-scale"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {/* Status Badges */}
                        <div className="flex items-center gap-2 mb-3">
                          {event.registered && (
                            <div className="inline-flex items-center gap-2 bg-sage-green/10 text-sage-green px-3 py-1 rounded-full text-sm font-medium">
                              <CheckCircle className="w-4 h-4" />
                              Registered
                            </div>
                          )}
                          {event.saved && !event.registered && (
                            <div className="inline-flex items-center gap-2 bg-blush/10 text-blush px-3 py-1 rounded-full text-sm font-medium">
                              <BookmarkCheck className="w-4 h-4" />
                              Saved
                            </div>
                          )}
                          <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-charcoal-70">
                            {eventTypeIcons[event.type]} {eventTypeLabels[event.type]}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-charcoal mb-2">{event.title}</h3>
                        <p className="text-charcoal-70 mb-4">{event.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-charcoal-70">
                            <Calendar className="w-4 h-4 text-sage-green" />
                            <span className="text-sm font-medium">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-charcoal-70">
                            <Clock className="w-4 h-4 text-sage-green" />
                            <span className="text-sm">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-charcoal-70">
                            {event.format === 'virtual' ? (
                              <MapPin className="w-4 h-4 text-sage-green" />
                            ) : (
                              <MapPinned className="w-4 h-4 text-terracotta" />
                            )}
                            <span className="text-sm">{event.location}</span>
                          </div>
                          {event.spots && (
                            <div className="flex items-center gap-2 text-charcoal-70">
                              <Users className="w-4 h-4 text-sage-green" />
                              <span className="text-sm">{event.spots}</span>
                            </div>
                          )}
                        </div>

                        <div className="text-sm text-charcoal-70">
                          <span className="font-medium">Instructor:</span> {event.instructor}
                        </div>
                      </div>

                      <div className="ml-6 flex flex-col gap-2">
                        <button
                          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                            event.registered
                              ? 'bg-gray-100 text-charcoal hover:bg-gray-200'
                              : 'bg-gradient-to-r from-sage-green to-sage-700 text-white hover:from-sage-700 hover:to-sage-green shadow-lg'
                          }`}
                        >
                          {event.registered ? 'View Details' : 'Register'}
                        </button>
                        {!event.saved && (
                          <button className="px-4 py-2 bg-white border border-sage-green/30 text-sage-green rounded-xl font-medium hover:bg-sage-green/10 transition-colors flex items-center justify-center gap-2">
                            <Bookmark className="w-4 h-4" />
                            Save
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Empty State
            <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-12 shadow-lg border border-sage-green/20 text-center">
              <div className="w-20 h-20 rounded-full bg-sage-green/10 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-10 h-10 text-sage-green" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-2">No events found</h3>
              <p className="text-charcoal-70 mb-6">
                {viewMode === 'saved' ?
                  'You haven\'t saved any events yet. Browse all events and save your favorites!' :
                viewMode === 'registered' ?
                  'You haven\'t registered for any events yet. Check out our upcoming workshops!' :
                  'No upcoming circles right now with these filters — check back soon or explore replays.'}
              </p>
              {(selectedTypes.length > 0 || searchTags.length > 0 || viewMode !== 'all') && (
                <button
                  onClick={() => {
                    setViewMode('all')
                    handleClearFilters()
                    setSearchTags([])
                    setSearchQuery('')
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-sage-green to-sage-700 text-white rounded-xl font-semibold hover:from-sage-700 hover:to-sage-green transition-all shadow-lg"
                >
                  Clear All Filters
                </button>
              )}
              {viewMode === 'all' && filteredEvents.filter(e => e.status === 'past' && e.recording).length > 0 && (
                <button
                  onClick={() => setShowPastEvents(true)}
                  className="mt-4 px-6 py-3 bg-white border border-sage-green/30 text-sage-green rounded-xl font-semibold hover:bg-sage-green/10 transition-colors flex items-center gap-2 mx-auto"
                >
                  <Play className="w-4 h-4" />
                  View Recorded Workshops
                </button>
              )}
            </div>
          )}

          {/* Past Events Section */}
          {(showPastEvents || filteredEvents.filter(e => e.status === 'past').length > 0) && viewMode === 'all' && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-charcoal">Past Events & Recordings</h2>
                {!showPastEvents && (
                  <button
                    onClick={() => setShowPastEvents(true)}
                    className="text-sage-green hover:text-sage-700 font-semibold text-sm"
                  >
                    Show All
                  </button>
                )}
              </div>
              <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-6 shadow-lg border border-sage-green/20">
                <div className="space-y-3">
                  {filteredEvents
                    .filter(e => e.status === 'past')
                    .slice(0, showPastEvents ? undefined : 3)
                    .map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-4 bg-cream rounded-xl hover:bg-sage-green/5 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-charcoal">{event.title}</h3>
                            <div className="inline-flex items-center px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-charcoal-70">
                              {eventTypeIcons[event.type]} {eventTypeLabels[event.type]}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-charcoal-70">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {event.instructor}
                            </div>
                          </div>
                        </div>
                        {event.recording && (
                          <button className="px-5 py-2 bg-gradient-to-r from-sage-green to-sage-700 text-white rounded-xl font-semibold hover:from-sage-700 hover:to-sage-green transition-all shadow-lg flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            Watch Recording
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Community Banner */}
          <div className="mt-12 backdrop-blur-xl bg-gradient-to-br from-terracotta/90 to-blush/90 rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 text-white">Suggest an Event</h2>
                <p className="text-white/90">
                  Have an idea for a workshop or want to see specific topics covered? Let us know!
                </p>
              </div>
              <button className="bg-white text-terracotta px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
                Submit Suggestion
              </button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
