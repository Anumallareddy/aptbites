import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'AptBites | Apartment Delivery Store',
  description:
    'Order snacks, drinks, and household essentials directly to your apartment. Simple, fast, and local delivery.',
  keywords: [
    'AptBites',
    'apartment delivery',
    'snacks delivery',
    'drinks delivery',
    'household essentials',
    'local convenience store',
  ],
  openGraph: {
    title: 'AptBites | Apartment Delivery Store',
    description:
      'Simple apartment delivery for snacks, drinks, and essentials.',
    url: 'https://aptbites.com',
    siteName: 'AptBites',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}