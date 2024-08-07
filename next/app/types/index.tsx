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
