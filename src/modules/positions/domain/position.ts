interface Position {
  name: string
  ticket: string
  units: number
  totalPayedUsd: number
  averagePrice: number
  weightPercentage: number | undefined
  //TODO: totalDividend: number
}

export type { Position }
