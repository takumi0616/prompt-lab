import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/globals.css'
import './styles/reset.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import GoogleAnalytics from '@/thirdparty/GoogleAnalytics'

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
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
