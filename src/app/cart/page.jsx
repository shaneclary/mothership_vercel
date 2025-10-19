'use client';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, updateQuantity, totalPrice, meetsMinimum, itemsNeeded, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    if (meetsMinimum) {
      router.push('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-charcoal mb-2 font-serif">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some nourishing meals to get started on your postpartum journey.</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/meals"
                className="bg-sage-green text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition"
              >
                Shop Meals
              </Link>
              <Link
                href="/packages"
                className="bg-white text-charcoal border border-gray-300 px-8 py-3 rounded-full font-semibold hover:border-sage-green transition"
              >
                Shop Packages
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-charcoal font-serif">Your Cart</h1>
            <button
              onClick={clearCart}
              className="text-sm text-gray-500 hover:text-red-600 transition"
            >
              Clear Cart
            </button>
          </div>

          {!meetsMinimum && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <span className="text-yellow-600 text-xl">⚠️</span>
              <div>
                <p className="font-semibold text-yellow-800 mb-1">Add {itemsNeeded} more meal{itemsNeeded !== 1 ? 's' : ''}</p>
                <p className="text-sm text-yellow-700">We have a 5-meal minimum to ensure quality shipping and freshness.</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg divide-y">
            {cart.map(item => (
              <div key={item.id} className="p-6 flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-200 rounded-xl flex-shrink-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-charcoal text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="flex gap-2">
                    {item.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-sage-green bg-opacity-10 text-sage-green text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold hover:bg-gray-300 transition"
                    >
                      −
                    </button>
                    <span className="font-bold text-charcoal w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-sage-green text-white flex items-center justify-center font-bold hover:bg-opacity-90 transition"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right w-20">
                    <p className="font-bold text-charcoal">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-xs text-gray-500">${item.price} each</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
            <h3 className="font-bold text-charcoal text-lg mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 pb-4 border-b">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} meals)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-sage-green font-semibold">FREE</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-xl font-bold text-charcoal mb-6">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={!meetsMinimum}
              className="w-full bg-sage-green text-white py-4 rounded-full font-semibold hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {meetsMinimum ? 'Proceed to Checkout' : `Add ${itemsNeeded} More Meal${itemsNeeded !== 1 ? 's' : ''} to Checkout`}
            </button>
          </div>

          <div className="text-center mt-6">
            <Link href="/meals" className="text-sage-green hover:underline">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
