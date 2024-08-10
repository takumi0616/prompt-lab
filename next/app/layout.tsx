import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/globals.css'
import './styles/reset.css'
import { Suspense } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import GoogleAnalytics from '@/thirdparty/GoogleAnalytics'
import Header from '@/components/layouts/Header'
import { ClientSessionProvider } from '@/lib/ClinentSessionProvider'
import Footer from './components/layouts/Footer'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <ClientSessionProvider>
          <Suspense fallback="...">
            <Header />
          </Suspense>
          {children}
          <Footer />
          <SpeedInsights />
        </ClientSessionProvider>
      </body>
    </html>
  )
}
