'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAppStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { CreditCard, Lock, ArrowLeft, Check, AlertCircle } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, isAuthenticated, user, clearCart } = useAppStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingZip: ''
  })

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  // Check if cart has subscription
  const hasSubscription = cartItems.some(item => item.type === 'subscription')
  const subscriptionItem = cartItems.find(item => item.type === 'subscription')

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/auth/login?returnUrl=/checkout')
    return null
  }

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    router.push('/cart')
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    const name = e.target.name

    // Format card number
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
      if (value.length > 19) value = value.substring(0, 19)
    }

    // Format expiry date
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '')
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4)
      }
      if (value.length > 5) value = value.substring(0, 5)
    }

    // Format CVV
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 4)
    }

    setPaymentInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate payment info
    if (paymentInfo.cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Please enter a valid card number')
      return
    }

    setLoading(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    const orderData = {
      items: cartItems,
      total,
      subscription: hasSubscription ? subscriptionItem : null
    }

    // Store order data temporarily
    sessionStorage.setItem('completedOrder', JSON.stringify(orderData))

    clearCart()
    router.push('/checkout/success')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F6F1' }}>
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-charcoal hover:text-sage-green mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <h1 className="font-cedarville text-4xl md:text-5xl text-sage-green mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Account Info */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-sage-200">
                <h2 className="text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-sage-green" />
                  Account Information
                </h2>
                <div className="bg-sage-50 rounded-xl p-4">
                  <p className="text-sm text-charcoal/70 mb-1">Signed in as</p>
                  <p className="font-semibold text-charcoal">{user?.email}</p>
                  <p className="text-sm text-sage-green">@{user?.username || 'user'}</p>
                </div>
              </div>

              {/* Subscription Confirmation */}
              {hasSubscription && (
                <div className="bg-gradient-to-r from-sage-green/10 to-sage-700/10 rounded-2xl p-6 shadow-md border-2 border-sage-green">
                  <h2 className="text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-terracotta" />
                    Subscription Confirmation
                  </h2>
                  <div className="space-y-3">
                    <p className="text-charcoal">
                      You&apos;re subscribing to <span className="font-bold text-sage-green">{subscriptionItem?.name}</span>
                    </p>
                    <div className="bg-white rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-charcoal/70">Recurring charge:</span>
                        <span className="text-2xl font-bold text-sage-green">
                          {formatPrice(subscriptionItem?.price || 0)}<span className="text-sm text-charcoal/60">/month</span>
                        </span>
                      </div>
                      <p className="text-xs text-charcoal/60 border-t border-sage-200 pt-2 mt-2">
                        You&apos;ll be charged {formatPrice(subscriptionItem?.price || 0)} monthly. Cancel anytime from your dashboard.
                      </p>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-charcoal/70">
                      <Check className="w-4 h-4 text-sage-green mt-0.5 flex-shrink-0" />
                      <span>Subscription will auto-renew monthly</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-charcoal/70">
                      <Check className="w-4 h-4 text-sage-green mt-0.5 flex-shrink-0" />
                      <span>Cancel or pause anytime from your account settings</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Information */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-sage-200">
                <h2 className="text-xl font-semibold text-charcoal mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-sage-green" />
                  Payment Information
                </h2>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={handleInputChange}
                      placeholder="Name on card"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">
                        Expiry
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="billingZip"
                        value={paymentInfo.billingZip}
                        onChange={handleInputChange}
                        placeholder="12345"
                        required
                        maxLength={5}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-charcoal/60">
                  <Lock className="w-4 h-4 text-sage-green" />
                  Your payment information is encrypted and secure
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-sage-green to-sage-700 text-white rounded-xl py-4 font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    {hasSubscription ? `Subscribe for ${formatPrice(total)}` : `Pay ${formatPrice(total)}`}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-sage-200 sticky top-24">
              <h2 className="text-xl font-semibold text-charcoal mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-sage-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-charcoal text-sm">{item.name}</h3>
                      <p className="text-xs text-charcoal/60">{item.description}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-charcoal/60">
                          {item.type === 'subscription' ? 'Monthly' : `Qty: ${item.quantity}`}
                        </span>
                        <span className="font-semibold text-sage-green">
                          {formatPrice(item.price * item.quantity)}
                          {item.type === 'subscription' && <span className="text-xs text-charcoal/60">/mo</span>}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-sage-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/70">Subtotal</span>
                  <span className="font-semibold text-charcoal">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/70">Tax (8%)</span>
                  <span className="font-semibold text-charcoal">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-sage-200 pt-2 flex justify-between items-center">
                  <span className="font-semibold text-charcoal">Total</span>
                  <span className="text-2xl font-bold text-sage-green">{formatPrice(total)}</span>
                </div>
                {hasSubscription && (
                  <p className="text-xs text-center text-charcoal/60 mt-2">
                    Billed monthly
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
