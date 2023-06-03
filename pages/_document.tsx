import { Html, Head, Main, NextScript } from 'next/document'
import { augmentDocumentWithEmotionCache } from './_app'

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

//You can also pass your custom document if you have one.
augmentDocumentWithEmotionCache(Document)

export default Document
