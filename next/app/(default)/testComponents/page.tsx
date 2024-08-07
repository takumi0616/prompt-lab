/* eslint-disable import/no-unresolved */
import React from 'react'
import styles from './page.module.css'
import GenerateButton from '@/components/common/GenerateButton'
import BigCard from '@/components/common/BigCard'
import InputBox from '@/components/common/InputBox'
import ResponseBox from '@/components/common/ResponseBox'
import SmallCard from '@/components/common/SmallCard'
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'

const TestComponents: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <BigCard />
        <GenerateButton />
        <InputBox />
        <ResponseBox />
        <SmallCard />
      </div>
      <Footer />
    </>
  )
}

export default TestComponents
