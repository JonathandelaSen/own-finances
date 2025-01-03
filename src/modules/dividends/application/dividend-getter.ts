import { DividendRepository } from "@modules/dividends/domain/dividend-repository";
import { CompanyDividend } from "@modules/dividends/domain/company-dividend";

export class DividendGetter {
  constructor(private readonly dividendRepository: DividendRepository) {}

  async run(year: number): Promise<CompanyDividend[]> {
    return await this.dividendRepository.getByYear(year);
  }
}
