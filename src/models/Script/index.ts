export interface Script {
  codeHash: string
  args: string
  hashType: string
}

export interface OutPoint {
  txHash: string
  index: string
}
