'use client';
import { useCart } from '@/context/CartContext';

export default function CartProgress() {
  const { totalItems, totalPrice, MINIMUM_MEALS, itemsNeeded } = useCart();
  const progress = Math.min(100, (totalItems / MINIMUM_MEALS) * 100);

  return (
    <div className="bg-white border-b sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="font-bold text-charcoal">
              {itemsNeeded > 0
                ? `${itemsNeeded} more meal${itemsNeeded !== 1 ? 's' : ''} needed`
                : '✓ Minimum met!'
              }
            </p>
            <p className="text-sm text-gray-600">
              {MINIMUM_MEALS} meals minimum for free shipping
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-charcoal">${totalPrice.toFixed(2)}</p>
            <p className="text-sm text-gray-600">{totalItems}/{MINIMUM_MEALS} meals selected</p>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-sage-green h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
