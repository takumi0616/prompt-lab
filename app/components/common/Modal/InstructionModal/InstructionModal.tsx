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
import { useTranslations } from 'next-intl'
import styles from './InstructionModal.module.css'

type InstructionModalProps = {
  onClose: () => void
  onFirst: () => void
}

const InstructionModal: React.FC<InstructionModalProps> = ({
  onClose,
  onFirst,
}) => {
  const t = useTranslations('InstructionModal')
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      step: 1,
      title: t('steps.step1.title'),
      subtitle: t('steps.step1.subtitle'),
      description: t('steps.step1.description'),
      image: '/SecondModalView.png',
      alt: 'Open AIのアカウント作成画面',
      icon: <TbCircleNumber1Filled className={styles.icon} />,
    },
    {
      step: 2,
      title: t('steps.step2.title'),
      subtitle: t('steps.step2.subtitle'),
      description: t('steps.step2.description'),
      image: '/ThirdModalView.png',
      alt: '支払い情報登録画面',
      icon: <TbCircleNumber2Filled className={styles.icon} />,
    },
    {
      step: 3,
      title: t('steps.step3.title'),
      subtitle: t('steps.step3.subtitle'),
      description: t('steps.step3.description'),
      image: '/FourthModalView.png',
      alt: 'クレジットカード',
      icon: <TbCircleNumber3Filled className={styles.icon} />,
    },
    {
      step: 4,
      title: t('steps.step4.title'),
      subtitle: t('steps.step4.subtitle'),
      description: t('steps.step4.description'),
      image: '/FifthModalView.png',
      alt: 'API keys-1',
      icon: <TbCircleNumber4Filled className={styles.icon} />,
    },
    {
      step: 5,
      title: t('steps.step5.title'),
      subtitle: t('steps.step5.subtitle'),
      description: t('steps.step5.description'),
      image: '/SixthModalView.png',
      alt: 'API keys-2',
      icon: <TbCircleNumber5Filled className={styles.icon} />,
    },
    {
      step: 6,
      title: t('steps.step6.title'),
      subtitle: t('steps.step6.subtitle'),
      description: t('steps.step6.description'),
      image: '/SeventhModalView.png',
      alt: 'API keys-3',
      icon: <TbCircleNumber6Filled className={styles.icon} />,
    },
  ]

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
            {t('step')} {steps[currentStep].step} {t('of')} {steps.length}
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
            &larr; {t('backButton')}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className={`${styles.nextButton} ${
              currentStep === steps.length - 1 ? styles.disabledButton : ''
            }`}
          >
            {t('nextButton')} &rarr;
          </button>
        </div>
        <div className={styles.backFirstBox}>
          <button className={styles.backFirst} onClick={onFirst}>
            &larr;{t('returnToApiKeyInput')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default InstructionModal
