/**
 * TitleText Component
 *
 * Renders titles with Parisienne font for uppercase letters
 * and Cormorant Garamond for lowercase letters
 */

import React from 'react'

interface TitleTextProps {
  children: string
  className?: string
}

export default function TitleText({ children, className = '' }: TitleTextProps) {
  // Split text into characters and wrap each with appropriate font
  const styledText = children.split('').map((char, index) => {
    const isUpperCase = char === char.toUpperCase() && char !== char.toLowerCase()
    const fontClass = isUpperCase ? 'font-parisienne text-[1.15em]' : 'font-cormorant'

    return (
      <span key={index} className={fontClass} style={{ display: 'inline-block' }}>
        {char}
      </span>
    )
  })

  return (
    <span className={className} style={{ lineHeight: 1.6 }}>
      {styledText}
    </span>
  )
}
