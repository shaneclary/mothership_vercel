import Image from 'next/image'

interface HeartRingIconProps {
  variant?: 1 | 2 | 3 | 4
  size?: number
  className?: string
}

/**
 * HeartRingIcon - Custom emoji/icon component using Mothership's heart ring logo
 *
 * Usage:
 * <HeartRingIcon /> - Default (variant 1, 20px)
 * <HeartRingIcon variant={2} size={32} /> - Variant 2, 32px
 * <HeartRingIcon className="inline-block" /> - With custom classes
 */
export default function HeartRingIcon({
  variant = 1,
  size = 20,
  className = ''
}: HeartRingIconProps) {
  return (
    <span
      className={`inline-block relative ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={`/logo/heart_ring_${variant}.png`}
        alt="Mothership"
        fill
        className="object-contain"
      />
    </span>
  )
}
