import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Montserrat } from 'next/font/google'
import styles from './styles/layout.module.css'
import './styles/globals.css'
import './styles/reset.css'
import { ClientSessionProvider } from '@/app/lib/ClinentSessionProvider'
import GoogleAnalytics from '@/app/thirdparty/GoogleAnalytics'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Prompt Lab',
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
      <body className={`${styles.body} ${montserrat.className}`}>
        <ClientSessionProvider>
          <Suspense fallback="..."></Suspense>
          <main className={styles.main}>{children}</main>
        </ClientSessionProvider>
      </body>
    </html>
  )
}
