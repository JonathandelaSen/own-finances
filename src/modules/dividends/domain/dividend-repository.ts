import { CompanyDividend } from "@modules/dividends/domain/company-dividend"

export interface DividendRepository {
  getByYear(year: number): Promise<CompanyDividend[]>
}
