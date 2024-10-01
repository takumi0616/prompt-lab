'use client'

import { SessionProvider } from 'next-auth/react'
import type { PropsWithChildren } from 'react'

export default function ClientSessionProvider({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>
}
