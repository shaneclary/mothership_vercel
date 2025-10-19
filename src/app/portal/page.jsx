'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import PortalNav from '@/components/PortalNav';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

function ActionCard({ icon, title, description, color, href }) {
  const bgColors = {
    yellow: 'bg-yellow-100',
    blue: 'bg-blue-100',
    purple: 'bg-purple-100',
    green: 'bg-green-100',
  };

  return (
    <Link href={href || '#'}>
      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
        <div className={`w-12 h-12 rounded-full ${bgColors[color]} flex items-center justify-center text-2xl mb-4`}>
          {icon}
        </div>
        <h4 className="font-bold text-charcoal mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="bg-white px-4 py-4 border-b flex items-center justify-between sticky top-0 z-10">
        <Link href="/" className="text-sage-green flex items-center gap-2 hover:underline">
          <span>🏪</span>
          Website
        </Link>
        <h1 className="font-serif text-2xl text-charcoal">Mothership Portal</h1>
        <div className="w-16"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-charcoal mb-2">Welcome back, {user?.firstName || 'Friend'}</h2>
        <p className="text-gray-600 font-serif italic mb-8">Your Mothership Portal — manage your nourishment journey</p>

        {user?.subscription && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-charcoal">Your Subscription</h3>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="text-gray-600">Next delivery</p>
                <p className="font-bold text-charcoal">{user.subscription.nextDelivery}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Meal plan size</p>
                <p className="font-bold text-charcoal">{user.subscription.mealPlanSize} meals</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Total savings</p>
                <p className="text-2xl font-bold text-green-600">${user.subscription.totalSavings.toFixed(2)}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">Plus 10% off all individual meals</p>
            </div>
          </div>
        )}

        <h3 className="text-2xl font-bold text-charcoal mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <ActionCard
            icon="⏸️"
            title="Pause"
            description="Skip deliveries"
            color="yellow"
            href="/portal/subscription"
          />
          <ActionCard
            icon="⏭️"
            title="Skip"
            description="Skip next delivery"
            color="blue"
            href="/portal/subscription"
          />
          <ActionCard
            icon="↔️"
            title="Change Size"
            description="Modify meal count"
            color="purple"
            href="/portal/subscription"
          />
          <ActionCard
            icon="🍽️"
            title="Edit Meals"
            description="Choose preferences"
            color="green"
            href="/meals"
          />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-charcoal mb-6">Your Journey</h3>
          <div className="flex items-center justify-between mb-4 pb-4 border-b">
            <p className="text-gray-600">Member since</p>
            <p className="font-semibold text-charcoal">{user?.memberSince || 'Recently'}</p>
          </div>
          {user?.subscription && (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-sage-green mb-1">{user.subscription.orders}</p>
                <p className="text-sm text-gray-600">Orders</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1" style={{ color: '#C88B6C' }}>{user.subscription.dayStreak}</p>
                <p className="text-sm text-gray-600">Day Streak</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600 mb-1">${user.subscription.totalSavings.toFixed(0)}</p>
                <p className="text-sm text-gray-600">Saved</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <PortalNav />
    </div>
  );
}

export default function PortalPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
