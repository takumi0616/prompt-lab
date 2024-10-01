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
  similarityScore?: number
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
}

export interface GenerateButtonProps {
  onClick: () => void
  disabled: boolean
  className?: string
  isLoading: boolean
}

export interface GenerationResultsProps {
  result: string
  model: string
  maxTokens: number
  seed: number
  topLogprobs: number
  temperature: number
  topP: number
}

export interface InputBoxProps {
  apiKey: string
  prompt: string
  setPrompt: (value: string) => void
  setIsModalOpen: (value: boolean) => void
  handleSubmit: (event: React.FormEvent) => Promise<void>
  isToggled: boolean
  setIsToggled: (value: boolean) => void
  isLoading: boolean
}

export interface CorrectBoxProps {
  correctText: string
  setCorrectText: (value: string) => void
}

export interface Tip {
  id: number
  title: string
  example: string
}

export interface SideBarProps {
  isOpen: boolean
  checkboxStates: boolean[]
  setCheckboxStates: React.Dispatch<React.SetStateAction<boolean[]>>
}

export interface TemplatePromptProps {
  onSelectPrompt: (prompt: string) => void
  onOpenModal: (prompt: string) => void
}

export interface TemplateModalProps {
  prompt: string
  onClose: () => void
  onInsert: () => void
}

export interface InstructionModalProps {
  onClose: () => void
  onFirst: () => void
}

export interface FirstModalProps {
  onClose: () => void
  onSwitchToExplanation: () => void
  setApiKey: (key: string) => void
}

export interface CreatePromptProps {
  onComplete: (generatedPrompt: string) => void
}
