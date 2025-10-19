'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import PortalNav from '@/components/PortalNav';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function SettingsContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    orderReminders: true,
    eventUpdates: true,
    promotional: true,
    newResources: true,
  });

  const handleLogout = () => {
    // Redirect first, then clear auth to avoid protected route intercepting
    router.push('/');
    // Use setTimeout to ensure navigation starts before clearing auth
    setTimeout(() => {
      logout();
    }, 100);
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="bg-white px-4 py-4 border-b sticky top-0 z-10">
        <h1 className="font-serif text-2xl text-charcoal text-center">Member Settings</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-sage-green text-white flex items-center justify-center text-2xl font-bold">
              {user?.firstName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-charcoal">{user?.name || 'User'}</h3>
              <p className="text-gray-600 text-sm">{user?.email}</p>
              <p className="text-gray-500 text-sm">Member since {user?.memberSince}</p>
            </div>
          </div>
          <button className="w-full bg-gray-100 text-charcoal py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
            ✏️ Edit Profile
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-bold text-charcoal mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
              { key: 'push', label: 'Push Notifications', description: 'Receive push notifications on your device' },
              { key: 'orderReminders', label: 'Order Reminders', description: 'Get reminded about upcoming deliveries' },
              { key: 'eventUpdates', label: 'Event Updates', description: 'Notifications about events and classes' },
              { key: 'promotional', label: 'Promotional Offers', description: 'Special offers and deals' },
              { key: 'newResources', label: 'New Resources', description: 'When new digital content is available' },
            ].map(({ key, label, description }) => (
              <div key={key} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-semibold text-charcoal">{label}</p>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
                <button
                  onClick={() => toggleNotification(key)}
                  className={`w-12 h-6 rounded-full transition ${
                    notifications[key] ? 'bg-sage-green' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    notifications[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg divide-y mb-6">
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👤</span>
              <div className="text-left">
                <p className="font-semibold text-charcoal">Edit Profile</p>
                <p className="text-sm text-gray-600">Update your personal information</p>
              </div>
            </div>
            <span>→</span>
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📍</span>
              <div className="text-left">
                <p className="font-semibold text-charcoal">Delivery Addresses</p>
                <p className="text-sm text-gray-600">Manage your delivery addresses</p>
              </div>
            </div>
            <span>→</span>
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💳</span>
              <div className="text-left">
                <p className="font-semibold text-charcoal">Payment Methods</p>
                <p className="text-sm text-gray-600">Manage your payment methods</p>
              </div>
            </div>
            <span>→</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg divide-y mb-6">
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-2xl">❓</span>
              <div className="text-left">
                <p className="font-semibold text-charcoal">Help Center</p>
                <p className="text-sm text-gray-600">Get answers to common questions</p>
              </div>
            </div>
            <span>→</span>
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <div className="text-left">
                <p className="font-semibold text-charcoal">Contact Support</p>
                <p className="text-sm text-gray-600">Get in touch with our support team</p>
              </div>
            </div>
            <span>→</span>
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏪</span>
              <div className="text-left">
                <p className="font-semibold text-charcoal">Browse Website</p>
                <p className="text-sm text-gray-600">Return to main Mothership website to shop for meals</p>
              </div>
            </div>
            <span>→</span>
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <div className="text-left">
                <p className="font-semibold text-charcoal">Send Feedback</p>
                <p className="text-sm text-gray-600">Share your thoughts with us</p>
              </div>
            </div>
            <span>→</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg divide-y mb-6">
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛡️</span>
              <div className="text-left">
                <p className="font-semibold text-charcoal">Privacy Policy</p>
                <p className="text-sm text-gray-600">Review our privacy policy</p>
              </div>
            </div>
            <span>→</span>
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📄</span>
              <div className="text-left">
                <p className="font-semibold text-charcoal">Terms of Service</p>
                <p className="text-sm text-gray-600">Review our terms of service</p>
              </div>
            </div>
            <span>→</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">App Version</span>
            <span className="font-semibold text-charcoal">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Build</span>
            <span className="font-semibold text-charcoal">2024.01.01</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-50 border-2 border-red-200 text-red-600 py-4 rounded-2xl font-semibold hover:bg-red-100 transition flex items-center justify-center gap-2"
        >
          <span>🚪</span>
          Sign Out
        </button>
      </div>

      <PortalNav />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}
