import { CompanyDividend } from "@modules/dividends/domain/company-dividend"

export interface DividendRepository {
  getByYears(years: number[]): Promise<CompanyDividend[]>
}
