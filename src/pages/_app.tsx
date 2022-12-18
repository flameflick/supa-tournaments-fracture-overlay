import '../styles/globals.css'
import '../styles/variables.css'
import '../styles/fonts.css'

import localFont from '@next/font/local'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
