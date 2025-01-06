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

interface EtoroRaw {
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

function fromEtoroRaw(raw: EtoroRaw[]): EToroDividend[] {
  return raw.map((item) => fromEtoroRawItem(item))
}

function fromEtoroRawItem(raw: EtoroRaw): EToroDividend {
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

export { fromEtoroRaw }
export type { EToroDividend, EtoroRaw }
