import React from 'react'
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
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>ChatGPT Configuration</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          <p>Customize your ChatGPT integration settings.</p>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formGroups}>
            <div className={styles.formGroup}>
              <label htmlFor="model">Model Name:</label>
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
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
                value={apiKey}
                placeholder="Enter your API key"
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="maxTokens">Max Tokens:</label>
              <input
                type="number"
                id="maxTokens"
                value={maxTokens}
                onChange={(e) => setMaxTokens(Number(e.target.value))}
                min="1"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="seed">Seed Number:</label>
              <input
                type="number"
                id="seed"
                value={seed}
                onChange={(e) => setSeed(Number(e.target.value))}
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
                  value={topLogprobs}
                  onChange={(e) => setTopLogprobs(Number(e.target.value))}
                  min="3"
                  max="10"
                  step="1"
                />
                <input
                  type="number"
                  value={topLogprobs}
                  onChange={(e) => setTopLogprobs(Number(e.target.value))}
                />
              </div>
            </div>
            <div className={styles.sliderGroup}>
              <label htmlFor="temperature">Temperature:</label>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  id="temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  min="0"
                  max="2"
                  step="0.5"
                />
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                />
              </div>
            </div>
            <div className={styles.sliderGroup}>
              <label htmlFor="topP">Top P:</label>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  id="topP"
                  value={topP}
                  onChange={(e) => setTopP(Number(e.target.value))}
                  min="0"
                  max="2"
                  step="0.5"
                />
                <input
                  type="number"
                  value={topP}
                  onChange={(e) => setTopP(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveButton}>Save</button>
        </div>
      </div>
    </div>
  )
}
