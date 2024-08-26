'use client'

import React from 'react'
import { CorrectBoxProps } from '@/types'

const CorrectBox: React.FC<CorrectBoxProps> = ({
  correctText,
  setCorrectText,
}) => {
  return (
    <div>
      <textarea
        placeholder="Enter correct text here..."
        value={correctText}
        onChange={(e) => setCorrectText(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
    </div>
  )
}

export default CorrectBox
