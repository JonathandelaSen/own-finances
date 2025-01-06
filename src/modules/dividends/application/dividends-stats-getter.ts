import { DividendRepository } from "@modules/dividends/domain/dividend-repository"
import { DividendsStats } from "@modules/dividends/domain/dividends-stats"

export class DividendsStatsGetter {
  constructor(private readonly dividendRepository: DividendRepository) {}

  async run(years: number[]): Promise<DividendsStats> {
    const dividends = (
      await Promise.all(
        years.map((year) => this.dividendRepository.getByYear(year))
      )
    ).flat()

    return dividends.reduce<DividendsStats>(
      (stats, dividend) => ({
        netDividendUSD: stats.netDividendUSD + dividend.netDividendUSD,
        netDividendEUR: stats.netDividendEUR + dividend.netDividendEUR,
        withholdingTaxAmountUSD:
          stats.withholdingTaxAmountUSD + dividend.withholdingTaxAmountUSD,
        withholdingTaxAmountEUR:
          stats.withholdingTaxAmountEUR + dividend.withholdingTaxAmountEUR,
      }),
      {
        netDividendUSD: 0,
        netDividendEUR: 0,
        withholdingTaxAmountUSD: 0,
        withholdingTaxAmountEUR: 0,
      }
    )
  }
}
