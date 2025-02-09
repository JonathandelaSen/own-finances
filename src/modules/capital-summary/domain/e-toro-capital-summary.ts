function parseNumber(value: string | number): number {
  if (typeof value === "number") {
    return value
  }
  // Check if the value is in the format "(number)" indicating a negative number
  const match = value.match(/^\((\d+(\.\d+)?)\)$/)
  if (match) {
    return -parseFloat(match[1])
  }
  // Otherwise, parse the number normally
  return parseFloat(value)
}

interface EToroCapitalSummary {
  initialRealizedCapital: { euro: number; dollar: number }
  deposits: { euro: number; dollar: number | null } // N/C for dollar means null
  reimbursements: { euro: number; dollar: number | null }
  credits: { euro: number; dollar: number | null }
  adjustments: { euro: number; dollar: number }
  profitsOrLossesClosedPositions: { euro: number; dollar: number }
  dividends: { euro: number; dollar: number }
  transferred: { euro: number; dollar: number }
  transfer: { euro: number; dollar: number }
  overnightFees: { euro: number; dollar: number }
  commission: { euro: number; dollar: number }
  administrativeFees: { euro: number; dollar: number }
  sdrtCharge: { euro: number; dollar: number }
  withdrawals: { euro: number; dollar: number | null }
  withdrawalFee: { euro: number; dollar: number | null }
  conversionFee: { euro: number; dollar: number | null }
  finalRealizedCapital: { euro: number; dollar: number }
  initialUnrealizedCapital: { euro: number; dollar: number }
  finalUnrealizedCapital: { euro: number; dollar: number }
  totalRealizedProfit: { euro: number; dollar: number }
}

interface EToroRawCapitalSummary {
  "Capital realizado inicial": [string | number, string | number]
  Depósitos: [string | number, string | number | null]
  Reembolsos: [string | number, string | number | null]
  Créditos: [string | number, string | number | null]
  Ajustes: [string | number, string | number]
  "Ganancias o pérdidas (solo posiciones cerradas)": [
    string | number,
    string | number
  ]
  Dividendos: [string | number, string | number]
  Transferidos: [string | number, string | number]
  Transferencia: [string | number, string | number]
  "Comisiones nocturnas": [string | number, string | number]
  Comisión: [string | number, string | number]
  "Comisiones administrativas": [string | number, string | number]
  "Cargo de SDRT": [string | number, string | number]
  Retiradas: [string | number, string | number | null]
  "Comisión por retirada de fondos": [string | number, string | number | null]
  "Comisión de conversión de divisas por depósito/retirada": [
    string | number,
    string | number | null
  ]
  "Capital realizado final": [string | number, string | number]
  "Capital no realizado inicial": [string | number, string | number]
  "Capital no realizado final": [string | number, string | number]
}

type EToroRawCapitalSummaryRow = {
  Detalles: string
  __EMPTY: string | number
  __EMPTY_1?: string | number
}

function fromEToroRawCapitalSummary(
  rows: EToroRawCapitalSummaryRow[]
): EToroCapitalSummary {
  const summary: Partial<EToroCapitalSummary> = {}

  for (const row of rows) {
    const label = row.Detalles
    const euroValue = row.__EMPTY_1
    const dollarValue = row.__EMPTY
    const euro =
      euroValue === "N/C" || euroValue === undefined
        ? 0
        : parseNumber(euroValue)
    const dollar =
      dollarValue === "N/C" || dollarValue === undefined
        ? 0
        : parseNumber(dollarValue)

    switch (label) {
      case "Capital realizado inicial":
        summary.initialRealizedCapital = {
          euro: euro as number,
          dollar: dollar as number,
        }
        break
      case "Depósitos":
        summary.deposits = { euro, dollar }
        break
      case "Reembolsos":
        summary.reimbursements = { euro, dollar }
        break
      case "Créditos":
        summary.credits = { euro, dollar }
        break
      case "Ajustes":
        summary.adjustments = { euro: euro as number, dollar: dollar as number }
        break
      case "Ganancias o pérdidas (solo posiciones cerradas)":
        summary.profitsOrLossesClosedPositions = {
          euro: euro as number,
          dollar: dollar as number,
        }
        break
      case "Dividendos":
        summary.dividends = { euro: euro as number, dollar: dollar as number }
        break
      case "Transferidos":
        summary.transferred = { euro: euro as number, dollar: dollar as number }
        break
      case "Transferencia":
        summary.transfer = { euro: euro as number, dollar: dollar as number }
        break
      case "Comisiones nocturnas":
        summary.overnightFees = {
          euro: euro as number,
          dollar: dollar as number,
        }
        break
      case "Comisión":
        summary.commission = { euro: euro as number, dollar: dollar as number }
        break
      case "Comisiones administrativas":
        summary.administrativeFees = {
          euro: euro as number,
          dollar: dollar as number,
        }
        break
      case "Cargo de SDRT":
        summary.sdrtCharge = { euro: euro as number, dollar: dollar as number }
        break
      case "Retiradas":
        summary.withdrawals = { euro, dollar }
        break
      case "Comisión por retirada de fondos":
        summary.withdrawalFee = { euro, dollar }
        break
      case "Comisión de conversión de divisas por depósito/retirada":
        summary.conversionFee = { euro: euro as number, dollar }
        break
      case "Capital realizado final":
        summary.finalRealizedCapital = {
          euro: euro as number,
          dollar: dollar as number,
        }
        break
      case "Capital no realizado inicial":
        summary.initialUnrealizedCapital = {
          euro: euro as number,
          dollar: dollar as number,
        }
        break
      case "Capital no realizado final":
        summary.finalUnrealizedCapital = {
          euro: euro as number,
          dollar: dollar as number,
        }
        break
    }
  }

  summary.totalRealizedProfit = {
    euro:
      (summary.adjustments?.euro ?? 0) +
      (summary.profitsOrLossesClosedPositions?.euro ?? 0) +
      (summary.dividends?.euro ?? 0) +
      (summary.overnightFees?.euro ?? 0) +
      (summary.commission?.euro ?? 0) +
      (summary.sdrtCharge?.euro ?? 0) +
      (summary.conversionFee?.euro ?? 0),
    dollar:
      (summary.adjustments?.dollar ?? 0) +
      (summary.profitsOrLossesClosedPositions?.dollar ?? 0) +
      (summary.dividends?.dollar ?? 0) +
      (summary.overnightFees?.dollar ?? 0) +
      (summary.commission?.dollar ?? 0) +
      (summary.sdrtCharge?.dollar ?? 0) +
      (summary.conversionFee?.dollar ?? 0),
  }
  return summary as EToroCapitalSummary
}

export { fromEToroRawCapitalSummary }
export type {
  EToroCapitalSummary,
  EToroRawCapitalSummary,
  EToroRawCapitalSummaryRow,
}
