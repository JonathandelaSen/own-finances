interface EToroDividend {
  paymentDate: string
  companyName: string
  netDividendUSD: number
  netDividendEUR: number
  withholdingTaxRate: string
  withholdingTaxAmountUSD: number
  withholdingTaxAmountEUR: number
  positionId: string
  type: string
}

interface EToroRaw {
  "Fecha de pago": string
  "Nombre del instrumento": string
  "Dividendo neto recibido (USD)": number
  "Dividendo neto recibido (EUR)": number
  "Tasa de retención fiscal (%)": string
  "Importe de la retención tributaria (USD)": number
  "Importe de la retención tributaria (EUR)": number
  "ID de posición": string
  Tipo: string
}

function fromEToroRaw(raw: EToroRaw[]): EToroDividend[] {
  return raw.map((item) => fromEToroRawItem(item))
}

function fromEToroRawItem(raw: EToroRaw): EToroDividend {
  return {
    paymentDate: raw["Fecha de pago"],
    companyName: raw["Nombre del instrumento"],
    netDividendUSD: raw["Dividendo neto recibido (USD)"],
    netDividendEUR: raw["Dividendo neto recibido (EUR)"],
    withholdingTaxRate: raw["Tasa de retención fiscal (%)"],
    withholdingTaxAmountUSD: raw["Importe de la retención tributaria (USD)"],
    withholdingTaxAmountEUR: raw["Importe de la retención tributaria (EUR)"],
    positionId: raw["ID de posición"],
    type: raw["Tipo"],
  }
}

export { fromEToroRaw }
export type { EToroDividend, EToroRaw }
