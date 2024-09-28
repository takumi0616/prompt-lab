// import { useTranslations } from 'next-intl'
import ChatInterface from '@/[locale]/(default)/chatInterface'

export default function Home() {
  // const t = useTranslations('HomePage')

  return (
    <>
      {/* <h1>{t('title')}</h1> */}
      <ChatInterface />
    </>
  )
}
