interface Position {
  name: string
  ticket: string
  units: number
  totalPayedUsd: number
  averagePriceUsd: number
  weightPercentage: number | undefined
  //TODO: totalDividend: number
}

export type { Position }
