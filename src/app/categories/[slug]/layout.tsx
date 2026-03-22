import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
  children: React.ReactNode
}

function formatCategoryName(slug: string) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function generateMetadata({ params }: Props): Metadata {
  const categoryName = formatCategoryName(params.slug)
  const url = `https://www.aptbites.com/categories/${params.slug}`

  return {
    title: `${categoryName}`,
    description: `Browse ${categoryName.toLowerCase()} available from AptBites.`,
    alternates: {
      canonical: `/categories/${params.slug}`,
    },
    openGraph: {
      title: `${categoryName} | AptBites`,
      description: `Browse ${categoryName.toLowerCase()} available from AptBites.`,
      url,
    },
    twitter: {
      title: `${categoryName} | AptBites`,
      description: `Browse ${categoryName.toLowerCase()} available from AptBites.`,
    },
  }
}

export default function CategoryLayout({ children }: Props) {
  return <>{children}</>
}