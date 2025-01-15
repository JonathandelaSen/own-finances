enum TransactionType {
  DIVIDENDO = "Dividendo",
  POSICION_ABIERTA = "Posición abierta",
  SDRT = "SDRT",
  COMISION_CONVERSION_DEPOSITO = "Comisión de conversión de depósito",
  GANANCIAS_PERDIDAS_OPERACION = "Ganancias/pérdidas de la operación",
  DEPOSITO = "Depósito",
  PAGO_INTERESES = "Pago de intereses",
  AJUSTE = "Ajuste",
  COMISION = "Comisión",
}
interface EToroAccountActivity {
  date: string
  type: TransactionType
  details: string
  amount: number
  units: number
  realizedCapitalChange: number
  realizedCapital: number
  balance: number
  positionId: string
  assetType: string
  nonWithdrawableAmount: number
}

interface EToroAccountActivityRaw {
  Fecha: string
  Tipo: string
  Detalles: string
  Importe: number
  Unidades: string
  "Cambio de capital realizado": number
  "Capital realizado": number
  Saldo: number
  "ID de posición": string
  "Tipo de activo": string
  "Importe no retirable": number
}

function fromEToroAccountActivityRaw(
  raw: EToroAccountActivityRaw[]
): EToroAccountActivity[] {
  return raw.map((item) => fromEToroAccountActivityRawItem(item))
}

function fromEToroAccountActivityRawItem(
  raw: EToroAccountActivityRaw
): EToroAccountActivity {
  return {
    date: raw["Fecha"],
    type: convertToTransactionType(raw["Tipo"]),
    details: raw["Detalles"],
    amount: raw["Importe"],
    units: raw["Unidades"] === "-" ? -999 : parseFloat(raw["Unidades"]),
    realizedCapitalChange: raw["Cambio de capital realizado"],
    realizedCapital: raw["Capital realizado"],
    balance: raw["Saldo"],
    positionId: raw["ID de posición"],
    assetType: raw["Tipo de activo"],
    nonWithdrawableAmount: raw["Importe no retirable"],
  }
}

function convertToTransactionType(type: string): TransactionType {
  if (Object.values(TransactionType).includes(type as TransactionType)) {
    return type as TransactionType
  }
  throw new Error(`Invalid TransactionType: ${type}`)
}
export { fromEToroAccountActivityRaw, TransactionType }
export type { EToroAccountActivity, EToroAccountActivityRaw }
