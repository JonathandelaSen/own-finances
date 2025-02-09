interface CapitalSummary {
  initialRealizedCapital: { euro: number; dollar: number }
  deposits: { euro: number; dollar: number } // N/C for dollar means null
  reimbursements: { euro: number; dollar: number }
  credits: { euro: number; dollar: number }
  adjustments: { euro: number; dollar: number }
  profitsOrLossesClosedPositions: { euro: number; dollar: number }
  dividends: { euro: number; dollar: number }
  transferred: { euro: number; dollar: number }
  transfer: { euro: number; dollar: number }
  overnightFees: { euro: number; dollar: number }
  commission: { euro: number; dollar: number }
  administrativeFees: { euro: number; dollar: number }
  sdrtCharge: { euro: number; dollar: number }
  withdrawals: { euro: number; dollar: number }
  withdrawalFee: { euro: number; dollar: number }
  conversionFee: { euro: number; dollar: number }
  finalRealizedCapital: { euro: number; dollar: number }
  initialUnrealizedCapital: { euro: number; dollar: number }
  finalUnrealizedCapital: { euro: number; dollar: number }
  totalRealizedProfit: { euro: number; dollar: number }
}

export type { CapitalSummary }
