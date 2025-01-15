import { DividendRepository } from "@modules/dividends/domain/dividend-repository"
import { CompanyDividend } from "@modules/dividends/domain/company-dividend"

export class DividendsGetter {
  constructor(private readonly dividendRepository: DividendRepository) {}

  async run(years: number[]): Promise<CompanyDividend[]> {
    return await this.dividendRepository.getByYears(years)
  }
}
