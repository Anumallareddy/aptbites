import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products',
  description:
    'Browse snacks, drinks, and apartment essentials available from AptBites.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'All Products | AptBites',
    description:
      'Browse snacks, drinks, and apartment essentials available from AptBites.',
    url: 'https://www.aptbites.com/products',
  },
  twitter: {
    title: 'All Products | AptBites',
    description:
      'Browse snacks, drinks, and apartment essentials available from AptBites.',
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}