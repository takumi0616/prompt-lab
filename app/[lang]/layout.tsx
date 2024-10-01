import { LanguageProvider } from '@/i18n/client'

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return <LanguageProvider initialLanguage={lang}>{children}</LanguageProvider>
}
