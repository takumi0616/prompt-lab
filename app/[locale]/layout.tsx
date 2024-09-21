import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Montserrat } from 'next/font/google'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { Footer, Header } from '../components/layouts'
import styles from '../styles/layout.module.css'
import '../styles/globals.css'
import '../styles/reset.css'
import { ClientSessionProvider } from '@/lib/ClinentSessionProvider'
import GoogleAnalytics from '@/thirdparty/GoogleAnalytics'
// import { SpeedInsights } from '@vercel/speed-insights/next'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'GPT-Logprobs',
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages({ locale })

  return (
    <html lang={locale}>
      <head>
        <GoogleAnalytics />
        <meta name="theme-color" content="#c9d6df" />
      </head>
      <body className={`${styles.body} ${montserrat.className}`}>
        <ClientSessionProvider>
          <NextIntlClientProvider messages={messages}>
            <Suspense fallback="...">
              <Header />
            </Suspense>
            <main className={styles.main}>{children}</main>
            <Footer />
            {/* <SpeedInsights /> */}
          </NextIntlClientProvider>
        </ClientSessionProvider>
      </body>
    </html>
  )
}
