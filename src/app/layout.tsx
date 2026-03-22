import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aptbites.com'),
  title: {
    default: 'AptBites | Snacks, Drinks & Apartment Essentials Delivered',
    template: '%s | AptBites',
  },
  description:
    'Order snacks, drinks, and apartment essentials from AptBites. Fast local delivery for your apartment community.',
  keywords: [
    'AptBites',
    'snack delivery',
    'drink delivery',
    'apartment essentials',
    'local delivery',
    'convenience delivery',
  ],
  applicationName: 'AptBites',
  authors: [{ name: 'AptBites' }],
  creator: 'AptBites',
  publisher: 'AptBites',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.aptbites.com',
    siteName: 'AptBites',
    title: 'AptBites | Snacks, Drinks & Apartment Essentials Delivered',
    description:
      'Fast local delivery of snacks, drinks, and apartment essentials.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'AptBites snacks, drinks, and apartment essentials',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AptBites | Snacks, Drinks & Apartment Essentials Delivered',
    description:
      'Fast local delivery of snacks, drinks, and apartment essentials.',
    images: ['/twitter-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  category: 'food',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}