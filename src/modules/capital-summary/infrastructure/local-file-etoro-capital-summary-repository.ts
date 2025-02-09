import * as XLSX from "xlsx"

import { CapitalSummary } from "@modules/capital-summary/domain/capital-summary"
import { CapitalSummaryRepository } from "@modules/capital-summary/domain/capital-summary-repository"
import {
  fromEToroRawCapitalSummary,
  EToroRawCapitalSummaryRow,
} from "@modules/capital-summary/domain/e-toro-capital-summary"

export class LocalFileEtoroCapitalSummaryRepository
  implements CapitalSummaryRepository
{
  async getByYears(years: number[]): Promise<CapitalSummary> {
    const files = await Promise.all(years.map((year) => this.getFile(year)))
    const capitalSummaries = files.map((file) =>
      this.getCapitalSummaryFromFile(file)
    )
    const totalCapitalSummary = capitalSummaries.reduce<CapitalSummary>(
      (acc, curr) => {
        // Iterate over all keys of the CapitalSummary object
        for (const key of Object.keys(acc) as (keyof CapitalSummary)[]) {
          acc[key] = {
            euro: acc[key].euro + curr[key].euro,
            dollar: acc[key].dollar + (curr[key].dollar ?? 0), // Handle N/C (null) as 0
          }
        }
        return acc
      },
      // Initialize accumulator with default structure
      Object.keys(capitalSummaries[0]).reduce((init, key) => {
        init[key as keyof CapitalSummary] = { euro: 0, dollar: 0 }
        return init
      }, {} as CapitalSummary)
    )

    return totalCapitalSummary
  }

  private getCapitalSummaryFromFile(file: XLSX.WorkBook): CapitalSummary {
    const worksheet = file.Sheets["Resumen de la cuenta"]
    const etoroJsonData = XLSX.utils.sheet_to_json(
      worksheet
    ) as EToroRawCapitalSummaryRow[]
    return fromEToroRawCapitalSummary(etoroJsonData) as CapitalSummary
  }

  private async getFile(year: number): Promise<XLSX.WorkBook> {
    const response = await fetch(`../eToro/etoro-${year}.xlsx`)
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
