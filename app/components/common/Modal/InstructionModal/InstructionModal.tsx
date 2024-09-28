import React, { useState } from 'react'
import Image from 'next/image'
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
  TbCircleNumber4Filled,
  TbCircleNumber5Filled,
  TbCircleNumber6Filled,
} from 'react-icons/tb'
import { RxCross1 } from 'react-icons/rx'
import styles from './InstructionModal.module.css'

const steps = [
  {
    step: 1,
    title: 'ChatGPT APIキーの取得方法',
    subtitle: 'Open AI社のアカウントを作成・ログインする',
    description:
      'Open AI社のAPIページにアクセスし、「Start building」をクリックしてください。',
    image: '/SecondModalView.png',
    alt: 'Open AIのアカウント作成画面',
    icon: <TbCircleNumber1Filled className={styles.icon} />, // ステップ1のアイコン
  },
  {
    step: 2,
    title: 'ChatGPT APIキーの取得方法',
    subtitle: '支払い情報を登録する-1',
    description:
      'TOP画面の左側のネジアイコン「Settings」から「Billing」を選択し、「Add payment details」をクリックします。個人名義で登録する場合は「Individual」、企業名義で登録する場合は「Company」を選択します。',
    image: '/ThirdModalView.png',
    alt: '支払い情報登録画面',
    icon: <TbCircleNumber2Filled className={styles.icon} />, // ステップ2のアイコン
  },
  {
    step: 3,
    title: 'ChatGPT APIキーの取得方法',
    subtitle: '支払い情報を登録する-2',
    description:
      'クレジットカードの情報を登録します。支払情報の登録後、「Your subscription was created successfully」と表示されれば、支払い情報の登録は完了です。',
    image: '/FourthModalView.png',
    alt: 'クレジットカード',
    icon: <TbCircleNumber3Filled className={styles.icon} />, // ステップ3のアイコン
  },
  {
    step: 4,
    title: 'ChatGPT APIキーの取得方法',
    subtitle: 'APIキーを取得する-1',
    description:
      'TOP画面の左上の鍵アイコン「API keys」を選択し、「+Create new secret key」をクリックします。',
    image: '/FifthModalView.png',
    alt: 'API keys-1',
    icon: <TbCircleNumber4Filled className={styles.icon} />, // ステップ3のアイコン
  },
  {
    step: 5,
    title: 'ChatGPT APIキーの取得方法',
    subtitle: 'APIキーを取得する-2',
    description:
      'NameでAPIキーの名前を決め、「Create secret key」をクリックします。',
    image: '/SixthModalView.png',
    alt: 'API keys-2',
    icon: <TbCircleNumber5Filled className={styles.icon} />, // ステップ3のアイコン
  },
  {
    step: 6,
    title: 'ChatGPT APIキーの取得方法',
    subtitle: 'APIキーを取得する-3',
    description:
      'ポップアップ表示される「Create new secret key」から、APIキーの情報をコピーしてメモしましょう。',
    image: '/SeventhModalView.png',
    alt: 'API keys-3',
    icon: <TbCircleNumber6Filled className={styles.icon} />, // ステップ3のアイコン
  },
  // さらに必要なステップを追加
]

type InstructionModalProps = {
  onClose: () => void
  onFirst: () => void
}

const InstructionModal: React.FC<InstructionModalProps> = ({
  onClose,
  onFirst,
}) => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
  }

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <RxCross1 />
        </button>
        <h1 className={styles.title}>{steps[currentStep].title}</h1>

        <div className={styles.modalIntro}>
          <p className={styles.step}>
            Step {steps[currentStep].step} of {steps.length}
          </p>
          <h2 className={styles.subtitle}>
            {steps[currentStep].icon}
            <span className={styles.subtitleText}>
              {steps[currentStep].subtitle}
            </span>
          </h2>
          <p className={styles.description}>{steps[currentStep].description}</p>
          <Image
            src={steps[currentStep].image}
            alt={steps[currentStep].alt}
            width={600}
            height={300}
            className={styles.imageRounded}
          />
        </div>

        <div className={styles.navigation}>
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`${styles.backButton} ${
              currentStep === 0 ? styles.disabledButton : ''
            }`}
          >
            &larr; 戻る
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className={`${styles.nextButton} ${
              currentStep === steps.length - 1 ? styles.disabledButton : ''
            }`}
          >
            次へ &rarr;
          </button>
        </div>
        <div className={styles.backFirstBox}>
          <button className={styles.backFirst} onClick={onFirst}>
            &larr;APIキーの入力に戻る。
          </button>
        </div>
      </div>
    </div>
  )
}

export default InstructionModal
