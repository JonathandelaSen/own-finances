import {
  EToroDividend,
  EtoroRaw,
  fromEtoroRaw,
} from "@modules/dividends/domain/e-toro-dividend"
import { CompanyDividend } from "@modules/dividends/domain/company-dividend"
import { DividendRepository } from "@modules/dividends/domain/dividend-repository"
import * as XLSX from "xlsx"

export class LocalFileEtoroDividendRepository implements DividendRepository {
  async getByYears(years: number[]): Promise<CompanyDividend[]> {
    const files = await Promise.all(years.map((year) => this.getFile(year)))
    const dividends = files
      .map((file) => this.getDividendsFromEtoro(file))
      .flat()
    const aggregatedDividends = this.getAggregatedCompanyDividends(dividends)
    aggregatedDividends.sort((a, b) => b.netDividendEUR - a.netDividendEUR)
    return aggregatedDividends
  }

  private getDividendsFromEtoro(file: XLSX.WorkBook): EToroDividend[] {
    const worksheet = file.Sheets["Dividendos"]
    const etoroJsonData = XLSX.utils.sheet_to_json(worksheet) as EtoroRaw[]
    return fromEtoroRaw(etoroJsonData)
  }

  private getAggregatedCompanyDividends(
    etoroDividends: EToroDividend[]
  ): CompanyDividend[] {
    const companyDividendsMap: Map<string, CompanyDividend> = new Map()

    for (const dividend of etoroDividends) {
      const companyName = dividend.companyName

      if (companyDividendsMap.has(companyName)) {
        const companyDividend = companyDividendsMap.get(companyName)!
        companyDividend.netDividendUSD += dividend.netDividendUSD
        companyDividend.netDividendEUR += dividend.netDividendEUR
        companyDividend.withholdingTaxAmountUSD +=
          dividend.withholdingTaxAmountUSD
        companyDividend.withholdingTaxAmountEUR +=
          dividend.withholdingTaxAmountEUR
      } else {
        companyDividendsMap.set(companyName, {
          companyName: companyName,
          netDividendUSD: dividend.netDividendUSD,
          netDividendEUR: dividend.netDividendEUR,
          withholdingTaxRate: dividend.withholdingTaxRate,
          withholdingTaxAmountUSD: dividend.withholdingTaxAmountUSD,
          withholdingTaxAmountEUR: dividend.withholdingTaxAmountEUR,
        })
      }
    }

    return Array.from(companyDividendsMap.values())
  }

  private async getFile(year: number): Promise<XLSX.WorkBook> {
    const response = await fetch(`/etoro-${year}.xlsx`)
    const blob = await response.blob()
    const reader = new FileReader()
    return new Promise((resolve) => {
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const file = XLSX.read(data, { type: "array" })
        resolve(file)
      }
      reader.readAsArrayBuffer(blob)
    })
  }
}
