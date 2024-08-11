import React, { useState, useEffect, useRef } from 'react'
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
    }, 30)
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
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>ChatGPT Configuration</h2>
          <p>Customize your ChatGPT integration settings.</p>
          <button className={styles.closeButton} onClick={handleCancel}>
            &times;
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formGroups}>
            <div className={styles.formGroup}>
              <label htmlFor="model">Model Name:</label>
              <select
                id="model"
                value={tempModel}
                onChange={(e) => setTempModel(e.target.value)}
              >
                <option value="gpt-4o">gpt-4o</option>
                <option value="gpt-4-turbo">gpt-4-turbo</option>
                <option value="gpt-4o-mini">gpt-4o-mini</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="apiKey">API Key:</label>
              <input
                type="password"
                id="apiKey"
                value={tempApiKey}
                placeholder="Enter your API key"
                onChange={(e) => setTempApiKey(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="maxTokens">Max Tokens:</label>
              <input
                type="number"
                id="maxTokens"
                value={tempMaxTokens}
                onChange={(e) => setTempMaxTokens(Number(e.target.value))}
                min="1"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="seed">Seed Number:</label>
              <input
                type="number"
                id="seed"
                value={tempSeed}
                onChange={(e) => setTempSeed(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className={styles.sliderGroups}>
            <div className={styles.sliderGroup}>
              <label htmlFor="topLogprobs">Top Logprobs:</label>
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
              </div>
            </div>
            <div className={styles.sliderGroup}>
              <label htmlFor="temperature">Temperature:</label>
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
              </div>
            </div>
            <div className={styles.sliderGroup}>
              <label htmlFor="topP">Top P:</label>
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
              </div>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
