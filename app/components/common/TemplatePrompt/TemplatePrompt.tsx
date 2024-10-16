import React from 'react'
import {
  FaEnvelope,
  FaPlane,
  FaPenFancy,
  FaShoppingCart,
  FaUtensils,
} from 'react-icons/fa'
import { IoLogoWechat } from 'react-icons/io5'
import { SiLibreofficeimpress } from 'react-icons/si'
import { BiDetail } from 'react-icons/bi'
import styles from './TemplatePrompt.module.css'
import { TemplatePromptProps } from '@/app/types'
import { useTranslation } from '@/i18n/client'

export default function TemplatePrompt({
  onOpenModal,
  lang,
}: TemplatePromptProps & { lang: string }) {
  const { t } = useTranslation(lang)

  const templates = [
    {
      title: t('templatePrompt.businessEmail'),
      subTitle: t('templatePrompt.clientProgressReport'),
      icon: <FaEnvelope />,
      prompt: t('templatePrompt.businessEmailPrompt'),
    },
    {
      title: t('templatePrompt.shoppingList'),
      subTitle: t('templatePrompt.weeklyGroceries'),
      icon: <FaShoppingCart />,
      prompt: t('templatePrompt.shoppingListPrompt'),
    },
    {
      title: t('templatePrompt.quickRecipe'),
      subTitle: t('templatePrompt.tenMinuteMeal'),
      icon: <FaUtensils />,
      prompt: t('templatePrompt.quickRecipePrompt'),
    },
    {
      title: t('templatePrompt.travelPlan'),
      subTitle: t('templatePrompt.tokyoTrip'),
      icon: <FaPlane />,
      prompt: t('templatePrompt.travelPlanPrompt'),
    },
    {
      title: t('templatePrompt.interviewQuestions'),
      subTitle: t('templatePrompt.interviewForAuthor'),
      icon: <FaPenFancy />,
      prompt: t('templatePrompt.interviewQuestionsPrompt'),
    },
    {
      title: t('templatePrompt.prosAndCons'),
      subTitle: t('templatePrompt.analyzeTopic'),
      icon: <IoLogoWechat />,
      prompt: t('templatePrompt.prosAndConsPrompt'),
    },
    {
      title: t('templatePrompt.presentationMaterial'),
      subTitle: t('templatePrompt.newSoftware'),
      icon: <SiLibreofficeimpress />,
      prompt: t('templatePrompt.presentationMaterialPrompt'),
    },
    {
      title: t('templatePrompt.meetingAgenda'),
      subTitle: t('templatePrompt.weeklyMeeting'),
      icon: <BiDetail />,
      prompt: t('templatePrompt.meetingAgendaPrompt'),
    },
  ]

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    title: string,
    subTitle: string,
    prompt: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onOpenModal(title, subTitle, prompt)
    }
  }

  return (
    <div className={styles.templatePrompt}>
      <div className={styles.templateGrid}>
        {templates.map((template, index) => (
          <div key={index} className={styles.templateCard}>
            <div
              className={styles.cardContent}
              role="button"
              tabIndex={0}
              onClick={() =>
                onOpenModal(template.title, template.subTitle, template.prompt)
              }
              onKeyDown={(event) =>
                handleKeyDown(
                  event,
                  template.title,
                  template.subTitle,
                  template.prompt,
                )
              }
            >
              <div className={styles.iconWrapper}>{template.icon}</div>
              <div className={styles.textContent}>
                <div className={styles.templateTitle}>{template.title}</div>
                <div className={styles.templateSubTitle}>
                  {template.subTitle}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
