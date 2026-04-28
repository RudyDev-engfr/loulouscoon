// components/Seo.tsx
import Head from 'next/head'

interface SeoProps {
  title: string
  description: string
  canonical?: string
  image?: string
  noIndex?: boolean
}

const SITE_NAME = "Des Loulou Coon's"
const SITE_URL = 'https://louloucoons.fr'
const DEFAULT_IMAGE = `${SITE_URL}/images/logo.png`

export default function Seo({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  noIndex = false,
}: SeoProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}
