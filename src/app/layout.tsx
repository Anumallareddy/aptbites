import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'AptBites',
    template: '%s | AptBites',
  },
  description:
    'Snacks, drinks, and everyday essentials delivered right to your apartment.',
  keywords: [
    'AptBites',
    'apartment delivery',
    'snacks',
    'drinks',
    'household essentials',
  ],
  metadataBase: new URL('https://aptbites.com'),
  openGraph: {
    title: 'AptBites',
    description:
      'Snacks, drinks, and essentials delivered right to your apartment.',
    url: 'https://aptbites.com',
    siteName: 'AptBites',
    type: 'website',
  },
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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