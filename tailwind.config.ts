import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced Nourishment Circle palette
        cream: '#F5F3EF',
        blush: '#F4E8E3',
        'sage-green': '#6A8E76', // Updated to jade-sage from spec
        'sage-green-light': '#C5D3BD',
        'sage-green-dark': '#5A7A66',
        sage: {
          DEFAULT: '#6A8E76',
          light: '#C5D3BD',
          dark: '#5A7A66',
          50: '#F4F6F3',
          100: '#E9EDE7',
          200: '#D3DCD0',
          300: '#C5D3BD',
          400: '#8FA089',
          500: '#6A8E76',
          600: '#5A7A66',
          700: '#4A6656',
        },
        charcoal: {
          DEFAULT: '#34332F', // Updated from spec
          40: 'rgba(52, 51, 47, 0.4)',
          50: 'rgba(52, 51, 47, 0.5)',
          60: 'rgba(52, 51, 47, 0.6)',
          70: '#5A645D', // Secondary text from spec
          80: 'rgba(52, 51, 47, 0.8)',
          90: 'rgba(52, 51, 47, 0.9)',
        },
        'terra-cotta': '#C88B6C',
        terracotta: '#C88B6C',
        'dusty-rose': '#D6AFA3',
        peach: '#f6af7b',
        gold: '#E2B85A', // Success/reward accent
        warn: '#D77B57', // Error/warning
        // Nourishment gradient stops
        'nourish-start': '#6A8E76',
        'nourish-end': '#C88B6C',
        'forest-green': '#4A6656', // Darker sage for depth
      },
      boxShadow: {
        card: '0 2px 8px rgba(52, 51, 47, 0.06)',
        hover: '0 4px 16px rgba(52, 51, 47, 0.08)',
        glow: '0 0 20px rgba(106, 142, 118, 0.3)',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '2rem',
        '3xl': '1.5rem',
      },
      transitionProperty: {
        soft: 'all',
      },
      transitionDuration: {
        soft: '250ms',
      },
      transitionTimingFunction: {
        soft: 'ease-in-out',
      },
      fontFamily: {
        'cedarville': ['Cedarville Cursive', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-scale': 'fadeInScale 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'petal-pulse': 'petalPulse 0.6s ease-out',
        'bloom': 'bloom 0.8s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        petalPulse: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.15)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bloom: {
          '0%': { transform: 'scale(0.8) rotate(-5deg)', opacity: '0' },
          '50%': { transform: 'scale(1.1) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(106, 142, 118, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(106, 142, 118, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
