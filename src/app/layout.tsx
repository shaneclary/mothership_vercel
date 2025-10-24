import type { Metadata, Viewport } from 'next'
import { Raleway, Poppins } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import MobileNav from '@/components/MobileNav'
import { parisienne, cormorant, inter } from './fonts'

// Additional fonts for specific use cases
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-raleway',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mothership - Nourishment for the Fourth Trimester',
  description: 'Wholesome frozen meals inspired by ancient postpartum care — delivered to your door. Support your recovery with nutrient-rich meals designed for new mothers.',
  keywords: 'postpartum meals, new mother nutrition, frozen meals, postpartum recovery, breastfeeding meals, healing foods',
  authors: [{ name: 'Mothership' }],
  creator: 'Mothership',
  publisher: 'Mothership',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://eatmothership.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mothership - Nourishment for the Fourth Trimester',
    description: 'Wholesome frozen meals inspired by ancient postpartum care — delivered to your door.',
    url: 'https://eatmothership.com',
    siteName: 'Mothership',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mothership - Postpartum Meal Delivery',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mothership - Nourishment for the Fourth Trimester',
    description: 'Wholesome frozen meals inspired by ancient postpartum care — delivered to your door.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // ✅ Enables iOS safe-area support
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${parisienne.variable} ${cormorant.variable} ${inter.variable} ${raleway.variable} ${poppins.variable} h-full bg-ivory text-slate-800 antialiased`}
    >
      <body className="min-h-full">
        <AuthProvider>
          <CartProvider>
            {children}
            <MobileNav />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}