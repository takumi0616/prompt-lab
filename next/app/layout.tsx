import type { Metadata } from 'next'
import './styles/globals.css'
import './styles/reset.css'
import { Suspense } from 'react'
// import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/layouts/Footer'
import styles from './styles/layout.module.css'
import Header from '@/components/layouts/Header'
import GoogleAnalytics from '@/thirdparty/GoogleAnalytics'
import { ClientSessionProvider } from '@/lib/ClinentSessionProvider'

export const metadata: Metadata = {
  title: 'GPT-Logprobs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics />
        <meta name="theme-color" content="#c9d6df" />
      </head>
      <body className={styles.body}>
        <ClientSessionProvider>
          <Suspense fallback="...">
            <Header />
          </Suspense>
          <main className={styles.main}>{children}</main>
          <Footer />
          {/* <SpeedInsights /> */}
        </ClientSessionProvider>
      </body>
    </html>
  )
}
