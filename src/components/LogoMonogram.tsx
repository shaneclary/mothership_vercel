"use client"
import Image from "next/image"
import Link from "next/link"
import clsx from "clsx"

/**
 * Mothership Monogram (heart-ring with "M")
 * - Uses PNG from public/logo/mothership-logo.png
 * - Contained within header height (h-10)
 * - Always keeps correct aspect ratio
 */
export default function LogoMonogram({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Mothership Home" className="block">
      <Image
        src="/logo/mothership-logo.png"
        alt="Mothership monogram"
        width={120}
        height={40}
        priority
        className={clsx("h-10 w-auto object-contain mx-auto", className)}
      />
    </Link>
  )
}
