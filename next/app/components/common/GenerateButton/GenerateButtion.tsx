'use client'

import React from 'react'
import s from './GenerateButton.module.css'

export default function GenerateButton() {
  return (
    <section className={s.container}>
      <div className={s.component}>
        <div className={s.generateButton}>
          <p>Generate</p>
        </div>
      </div>
    </section>
  )
}
