'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const fillDemo = () => {
    setEmail('demo@mothership.com');
    setPassword('demo123');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      router.push('/portal');
    } else {
      setError(result.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-charcoal mb-8 hover:text-sage-green">
          <span>←</span> Back
        </Link>

        <h1 className="text-4xl font-bold text-charcoal mb-2">Welcome Back</h1>
        <p className="text-gray-600 font-serif italic mb-8">Sign in to access your Mothership Portal</p>

        {/* Demo Account Info */}
        <div className="bg-sage-green bg-opacity-10 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-sage-green text-xl">ℹ️</span>
            <div>
              <h3 className="font-bold text-charcoal mb-1">Demo Account</h3>
              <p className="text-sm text-gray-600">Try the Mothership Portal with our demo account</p>
            </div>
          </div>
          <button
            onClick={fillDemo}
            type="button"
            className="w-full bg-sage-green bg-opacity-20 text-sage-green rounded-full py-3 font-semibold hover:bg-opacity-30 transition"
          >
            Fill Demo Credentials
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage-green"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage-green"
            />
          </div>

          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-sm text-gray-500 hover:text-sage-green">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sage-green text-white rounded-full py-4 font-semibold mt-6 hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-cream text-gray-500">or</span>
          </div>
        </div>

        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-sage-green font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
