'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import PortalNav from '@/components/PortalNav';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

function PerksContent() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const referralLink = 'mothership://r/XXXXXX';

  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="bg-white px-4 py-4 border-b sticky top-0 z-10">
        <h1 className="font-serif text-2xl text-charcoal text-center">Perks & Offers</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-charcoal mb-2">Perks & Offers</h2>
        <p className="text-gray-600 mb-8">Exclusive benefits and rewards for members</p>

        <div className="bg-gradient-to-br from-sage-green to-green-600 rounded-3xl p-6 text-white shadow-xl mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Member Savings</h3>
              <p className="text-green-100">You've saved with your membership</p>
            </div>
            <div className="text-4xl">📈</div>
          </div>
          <p className="text-5xl font-bold mb-2">${user?.subscription?.totalSavings.toFixed(2) || '0.00'}</p>
          <p className="text-green-100 text-sm">Plus 10% off all individual meals</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">
              🎁
            </div>
            <h3 className="text-xl font-bold text-charcoal">Share the Mothership</h3>
          </div>

          <p className="text-gray-600 mb-6">
            Give $20 off a friend's first Mothership order (min $100). When they complete their first paid order (not cancelled within 14 days), you earn $20 in Mothership credit. Credits expire after 12 months.
          </p>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2 font-semibold">Your Share Link</p>
            <div className="flex items-center gap-3">
              <code className="flex-1 bg-white px-4 py-3 rounded-xl text-sm text-charcoal border">
                {referralLink}
              </code>
              <button
                onClick={copyToClipboard}
                className="bg-sage-green text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition flex-shrink-0"
              >
                {copied ? '✓' : '📋'}
              </button>
              <button className="bg-terra-cotta text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition flex-shrink-0">
                📤
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-charcoal">How It Works</h4>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-sage-green text-white flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-semibold text-charcoal mb-1">Share Your Link</p>
                <p className="text-sm text-gray-600">Send your personal link via SMS, email, or social.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-sage-green text-white flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-semibold text-charcoal mb-1">They Save $20</p>
                <p className="text-sm text-gray-600">$20 off their first order of $100+ is applied at checkout.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-sage-green text-white flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-semibold text-charcoal mb-1">You Earn $20</p>
                <p className="text-sm text-gray-600">After 14 days, if their order is not cancelled/refunded, your $20 credit becomes active for 12 months.</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-charcoal mb-4">Available Perks</h3>
        <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
          <div className="text-6xl mb-4">🎁</div>
          <h4 className="text-xl font-bold text-charcoal mb-2">No Active Perks</h4>
          <p className="text-gray-600">Check back regularly for new exclusive offers</p>
        </div>
      </div>

      <PortalNav />
    </div>
  );
}

export default function PerksPage() {
  return (
    <ProtectedRoute>
      <PerksContent />
    </ProtectedRoute>
  );
}
