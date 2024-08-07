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
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.option}>
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
        <div className={styles.option}>
          <label htmlFor="apiKey">API Key:</label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
          />
        </div>
        <div className={styles.option}>
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
        <div className={styles.option}>
          <label htmlFor="seed">Seed Number:</label>
          <input
            type="number"
            id="seed"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            required
          />
        </div>
        <div className={styles.option}>
          <label htmlFor="topLogprobs">Top Logprobs:</label>
          <input
            type="range"
            id="topLogprobs"
            value={topLogprobs}
            onChange={(e) => setTopLogprobs(Number(e.target.value))}
            min="3"
            max="10"
            step="1"
          />
          <span>{topLogprobs}</span>
        </div>
        <div className={styles.option}>
          <label htmlFor="temperature">Temperature:</label>
          <input
            type="range"
            id="temperature"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            min="0"
            max="2"
            step="0.5"
          />
          <span>{temperature}</span>
        </div>
        <div className={styles.option}>
          <label htmlFor="topP">Top P:</label>
          <input
            type="range"
            id="topP"
            value={topP}
            onChange={(e) => setTopP(Number(e.target.value))}
            min="0"
            max="2"
            step="0.5"
          />
          <span>{topP}</span>
        </div>
      </div>
    </div>
  )
}
