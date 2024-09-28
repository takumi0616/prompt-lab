import React, { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import styles from './ConfigModal.module.css'
import { ConfigModalProps } from '@/types'

export default function ConfigModal({
  model,
  setModel,
  apiKey,
  setApiKey,
  maxTokens,
  setMaxTokens,
  seed,
  setSeed,
  topLogprobs,
  setTopLogprobs,
  temperature,
  setTemperature,
  topP,
  setTopP,
  isOpen,
  onClose,
}: ConfigModalProps & { isOpen: boolean; onClose: () => void }) {
  const [tempModel, setTempModel] = useState(model)
  const [tempApiKey, setTempApiKey] = useState(apiKey)
  const [tempMaxTokens, setTempMaxTokens] = useState(maxTokens)
  const [tempSeed, setTempSeed] = useState(seed)
  const [tempTopLogprobs, setTempTopLogprobs] = useState(topLogprobs)
  const [tempTemperature, setTempTemperature] = useState(temperature)
  const [tempTopP, setTempTopP] = useState(topP)

  const modalRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('ConfigModal')

  const [showModelTooltip, setShowModelTooltip] = useState(false)
  const [showApiKeyTooltip, setShowApiKeyTooltip] = useState(false)
  const [showMaxTokensTooltip, setShowMaxTokensTooltip] = useState(false)
  const [showSeedNumberTooltip, setShowSeedNumberTooltip] = useState(false)
  const [showTopLogprobsTooltip, setShowTopLogprobsTooltip] = useState(false)
  const [showTemperatureTooltip, setShowTemperatureTooltip] = useState(false)
  const [showTopPTooltip, setShowTopPTooltip] = useState(false)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      fadeIn(modalRef.current)
    }
  }, [isOpen])

  const fadeIn = (element: HTMLElement) => {
    let opacity = 0
    element.style.opacity = opacity.toString()
    element.style.display = 'block'

    const timer = setInterval(() => {
      if (opacity >= 1) {
        clearInterval(timer)
      }
      opacity += 0.1
      element.style.opacity = opacity.toString()
    }, 15)
  }

  const fadeOut = (element: HTMLElement, callback: () => void) => {
    let opacity = 1
    const timer = setInterval(() => {
      if (opacity <= 0) {
        clearInterval(timer)
        element.style.display = 'none'
        callback()
      }
      opacity -= 0.1
      element.style.opacity = opacity.toString()
    }, 15)
  }

  useEffect(() => {
    if (isOpen) {
      setTempModel(model)
      setTempApiKey(apiKey)
      setTempMaxTokens(maxTokens)
      setTempSeed(seed)
      setTempTopLogprobs(topLogprobs)
      setTempTemperature(temperature)
      setTempTopP(topP)
    }
  }, [isOpen, model, apiKey, maxTokens, seed, topLogprobs, temperature, topP])

  useEffect(() => {
    const savedApiKey = localStorage.getItem('apiKey')
    if (savedApiKey) {
      setTempApiKey(savedApiKey)
      setApiKey(savedApiKey)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('apiKey', tempApiKey)
  }, [tempApiKey])

  if (!isOpen) {
    return null
  }

  const handleSave = () => {
    setModel(tempModel)
    setApiKey(tempApiKey)
    setMaxTokens(tempMaxTokens)
    setSeed(tempSeed)
    setTopLogprobs(tempTopLogprobs)
    setTemperature(tempTemperature)
    setTopP(tempTopP)
    fadeOut(modalRef.current!, onClose)
  }

  const handleCancel = () => {
    fadeOut(modalRef.current!, onClose)
  }

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{t('Header')}</h2>
          <p>{t('Description')}</p>
          <button className={styles.closeButton} onClick={handleCancel}>
            &times;
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formGroups}>
            <div
              className={styles.formGroup}
              onMouseEnter={() => setShowModelTooltip(true)}
              onMouseLeave={() => setShowModelTooltip(false)}
            >
              <label htmlFor="model">{t('ModelName')}</label>
              <select
                id="model"
                value={tempModel}
                onChange={(e) => setTempModel(e.target.value)}
              >
                <option value="gpt-4o">gpt-4o</option>
                <option value="gpt-4-turbo">gpt-4-turbo</option>
                <option value="gpt-4o-mini">gpt-4o-mini</option>
              </select>
              {showModelTooltip && (
                <div className={styles.tooltip}>{t('TooltipModel')}</div>
              )}
            </div>
            <div
              className={styles.formGroup}
              onMouseEnter={() => setShowApiKeyTooltip(true)}
              onMouseLeave={() => setShowApiKeyTooltip(false)}
            >
              <label htmlFor="apiKey">{t('ApiKey')}</label>
              <input
                type="password"
                id="apiKey"
                value={tempApiKey}
                placeholder={t('ApiKey')}
                onChange={(e) => setTempApiKey(e.target.value)}
                required
              />
              {showApiKeyTooltip && (
                <div className={styles.tooltip}>{t('TooltipApiKey')}</div>
              )}
            </div>
            <div
              className={styles.formGroup}
              onMouseEnter={() => setShowMaxTokensTooltip(true)}
              onMouseLeave={() => setShowMaxTokensTooltip(false)}
            >
              <label htmlFor="maxTokens">{t('MaxTokens')}</label>
              <input
                type="number"
                id="maxTokens"
                value={tempMaxTokens}
                onChange={(e) => setTempMaxTokens(Number(e.target.value))}
                min="1"
                required
              />
              {showMaxTokensTooltip && (
                <div className={styles.tooltip}>{t('TooltipMaxTokens')}</div>
              )}
            </div>
            <div
              className={styles.formGroup}
              onMouseEnter={() => setShowSeedNumberTooltip(true)}
              onMouseLeave={() => setShowSeedNumberTooltip(false)}
            >
              <label htmlFor="seed">{t('SeedNumber')}</label>
              <input
                type="number"
                id="seed"
                value={tempSeed}
                onChange={(e) => setTempSeed(Number(e.target.value))}
                required
              />
              {showSeedNumberTooltip && (
                <div className={styles.tooltip}>{t('TooltipSeedNumber')}</div>
              )}
            </div>
          </div>
          <div className={styles.sliderGroups}>
            <div
              className={styles.sliderGroup}
              onMouseEnter={() => setShowTopLogprobsTooltip(true)}
              onMouseLeave={() => setShowTopLogprobsTooltip(false)}
            >
              <label htmlFor="topLogprobs">{t('TopLogprobs')}</label>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  id="topLogprobs"
                  value={tempTopLogprobs}
                  onChange={(e) => setTempTopLogprobs(Number(e.target.value))}
                  min="3"
                  max="10"
                  step="1"
                />
                <input
                  type="number"
                  value={tempTopLogprobs}
                  onChange={(e) => setTempTopLogprobs(Number(e.target.value))}
                />
                {showTopLogprobsTooltip && (
                  <div className={styles.tooltip}>
                    {t('TooltipTopLogprobs')}
                  </div>
                )}
              </div>
            </div>
            <div
              className={styles.sliderGroup}
              onMouseEnter={() => setShowTemperatureTooltip(true)}
              onMouseLeave={() => setShowTemperatureTooltip(false)}
            >
              <label htmlFor="temperature">{t('Temperature')}</label>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  id="temperature"
                  value={tempTemperature}
                  onChange={(e) => setTempTemperature(Number(e.target.value))}
                  min="0"
                  max="2"
                  step="0.1"
                />
                <input
                  type="number"
                  value={tempTemperature}
                  onChange={(e) => setTempTemperature(Number(e.target.value))}
                />
                {showTemperatureTooltip && (
                  <div className={styles.tooltip}>
                    {t('TooltipTemperature')}
                  </div>
                )}
              </div>
            </div>
            <div
              className={styles.sliderGroup}
              onMouseEnter={() => setShowTopPTooltip(true)}
              onMouseLeave={() => setShowTopPTooltip(false)}
            >
              <label htmlFor="topP">{t('TopP')}</label>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  id="topP"
                  value={tempTopP}
                  onChange={(e) => setTempTopP(Number(e.target.value))}
                  min="0"
                  max="1"
                  step="0.1"
                />
                <input
                  type="number"
                  value={tempTopP}
                  onChange={(e) => setTempTopP(Number(e.target.value))}
                />
                {showTopPTooltip && (
                  <div className={styles.tooltip}>{t('TooltipTopP')}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            {t('Cancel')}
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            {t('Save')}
          </button>
        </div>
      </div>
    </div>
  )
}
