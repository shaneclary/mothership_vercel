'use client'

import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
  min?: number
  max?: number
  className?: string
}

export default function QuantitySelector({ 
  quantity, 
  onQuantityChange, 
  min = 0, 
  max = 99,
  className 
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1)
    }
  }

  return (
    <div className={cn("flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm", className)}>
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className={cn(
          "p-3 flex items-center justify-center transition-all duration-200",
          quantity <= min
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-charcoal hover:bg-sage/10 hover:text-sage hover:scale-110 active:scale-95"
        )}
      >
        <Minus className="w-4 h-4" />
      </button>
      
      <div className="px-4 py-3 min-w-[4rem] text-center border-x border-gray-200 bg-white">
        <span className={cn(
          "font-bold text-lg",
          quantity > 0 ? "text-charcoal" : "text-gray-400"
        )}>
          {quantity}
        </span>
      </div>
      
      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className={cn(
          "p-3 flex items-center justify-center transition-all duration-200",
          quantity >= max
            ? "text-gray-400 cursor-not-allowed bg-gray-100"
            : "text-charcoal hover:bg-sage/10 hover:text-sage hover:scale-110 active:scale-95"
        )}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
