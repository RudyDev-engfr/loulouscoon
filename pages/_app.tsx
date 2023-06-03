import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createEmotionSsrAdvancedApproach } from 'tss-react/next/pagesDir'

const { augmentDocumentWithEmotionCache, withAppEmotionCache } = createEmotionSsrAdvancedApproach({
  key: 'css',
})

export { augmentDocumentWithEmotionCache }

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default withAppEmotionCache(App)
