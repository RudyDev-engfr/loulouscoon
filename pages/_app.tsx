import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/molecules/Header'
import { createEmotionSsrAdvancedApproach } from 'tss-react/next/pagesDir'
import Footer from '@/components/molecules/Footer'

const { augmentDocumentWithEmotionCache, withAppEmotionCache } = createEmotionSsrAdvancedApproach({
  key: 'css',
})

export { augmentDocumentWithEmotionCache }

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default withAppEmotionCache(App)
