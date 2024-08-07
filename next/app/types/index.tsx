export interface TopLogprob {
  token: string
  logprob: number
}

export interface TokenInfo {
  token: string
  logprob: number
  bytes: number[]
  top_logprobs: TopLogprob[]
}

export interface LogprobsDisplayProps {
  logprobs: TokenInfo[]
}

export interface ResultData {
  text: string
  data: {
    choices: {
      logprobs: {
        content: TokenInfo[]
      }
    }[]
  }
}

export interface BigCardProps {
  tokenInfo: TokenInfo
}

export interface SmallCardProps {
  token: string
  percentage: number
  displayToken: (token: string) => string
}

export interface ConfigModalProps {
  model: string
  setModel: (value: string) => void
  apiKey: string
  setApiKey: (value: string) => void
  maxTokens: number
  setMaxTokens: (value: number) => void
  seed: number
  setSeed: (value: number) => void
  topLogprobs: number
  setTopLogprobs: (value: number) => void
  temperature: number
  setTemperature: (value: number) => void
  topP: number
  setTopP: (value: number) => void
  isOpen: boolean
  onClose: () => void
}

export interface GenerateButtonProps {
  onClick: () => void
  disabled: boolean
  className?: string
}

export interface ResponseBoxProps {
  result: string
}

export interface InputBoxProps {
  apiKey: string
  prompt: string
  setPrompt: (value: string) => void
  setIsModalOpen: (value: boolean) => void
  handleSubmit: (event: React.FormEvent) => Promise<void>
}

export interface ParameterBoxProps {
  model: string
  maxTokens: number
  seed: number
  topLogprobs: number
  temperature: number
  topP: number
}
