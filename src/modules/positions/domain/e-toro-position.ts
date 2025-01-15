enum TransactionType {
  DIVIDENDO = "Dividendo",
  POSICION_ABIERTA = "Posición abierta",
  SDRT = "SDRT",
  COMISION_CONVERSION_DEPOSITO = "Comisión de conversión de depósito",
  GANANCIAS_PERDIDAS_OPERACION = "Ganancias/pérdidas de la operación",
  DEPOSITO = "Depósito",
  PAGO_INTERESES = "Pago de intereses",
}
interface EToroPosition {
  date: string
  type: TransactionType
  details: string
  amount: number
  units: string | number // Depending on the format of "Unidades"
  realizedCapitalChange: number
  realizedCapital: number
  balance: number
  positionId: string
  assetType: string
  nonWithdrawableAmount: number
}

interface EtoroPositionRaw {
  Fecha: string
  Tipo: string
  Detalles: string
  Importe: number
  Unidades: string | number // Matches "Unidades" format
  "Cambio de capital realizado": number
  "Capital realizado": number
  Saldo: number
  "ID de posición": string
  "Tipo de activo": string
  "Importe no retirable": number
}

function fromEtoroPositionRaw(raw: EtoroPositionRaw[]): EToroPosition[] {
  return raw.map((item) => fromEtoroPositionRawItem(item))
}

function fromEtoroPositionRawItem(raw: EtoroPositionRaw): EToroPosition {
  return {
    date: raw["Fecha"],
    type: convertToTransactionType(raw["Tipo"]),
    details: raw["Detalles"],
    amount: raw["Importe"],
    units: raw["Unidades"],
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
export { fromEtoroPositionRaw }
export type { EToroPosition, EtoroPositionRaw }
