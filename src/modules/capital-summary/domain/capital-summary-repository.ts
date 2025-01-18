import { CapitalSummary } from "@modules/capital-summary/domain/capital-summary"

interface CapitalSummaryRepository {
  getByYears(years: number[]): Promise<CapitalSummary>
}

export type { CapitalSummaryRepository }
