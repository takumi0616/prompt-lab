import ChatInterface from '@/(default)/chatInterface'
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import GenerateButton from '@/components/common/GenerateButton'

export default function Home() {
  return (
    <>
      <Header />
      <ChatInterface />
      <Footer />
    </>
  )
}
