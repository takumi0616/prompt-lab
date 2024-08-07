export interface TopLogprobs {
  [key: string]: number
}

export interface TokenInfo {
  token: string
  logprob: number
  bytes: number[]
  top_logprobs: TopLogprobs[]
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
