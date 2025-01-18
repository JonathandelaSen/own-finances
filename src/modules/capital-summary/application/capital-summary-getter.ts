import { CapitalSummary } from "@modules/capital-summary/domain/capital-summary"
import { CapitalSummaryRepository } from "@modules/capital-summary/domain/capital-summary-repository"

export class CapitalSummaryGetter {
  constructor(
    private readonly capitalSummaryRepository: CapitalSummaryRepository
  ) {}

  async run(years: number[]): Promise<CapitalSummary> {
    return await this.capitalSummaryRepository.getByYears(years)
  }
}
