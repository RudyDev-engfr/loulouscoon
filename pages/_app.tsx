import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/molecules/Header'
import { createEmotionSsrAdvancedApproach } from 'tss-react/next/pagesDir'

const { augmentDocumentWithEmotionCache, withAppEmotionCache } = createEmotionSsrAdvancedApproach({
  key: 'css',
})

export { augmentDocumentWithEmotionCache }

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default withAppEmotionCache(App)
