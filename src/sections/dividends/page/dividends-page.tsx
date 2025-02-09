import { useEffect, useState } from "react"

import { CompanyDividend } from "@modules/dividends/domain/company-dividend"
import { LocalFileEtoroDividendRepository } from "@modules/dividends/infrastructure/local-file-etoro-dividend-repository"
import { DividendsTable } from "@sections/dividends/components/dividends-table/dividends-table"
import { YearTabs } from "@sections/shared/components/years-tabs/year-tabs"
import { InfoPanel } from "@sections/shared/components/info-panel/info-panel"
import styles from "./dividends-page.module.css"
import { DividendsStatsGetter } from "@modules/dividends/application/dividends-stats-getter"
import { DividendsStats } from "@modules/dividends/domain/dividends-stats"
import { DividendsGetter } from "@modules/dividends/application/dividends-getter"

const ALL_YEARS_KEY = 9999
const YEARS = [2023, 2024, 2025]
const YEARS_TABS = [...YEARS, ALL_YEARS_KEY]

function DividendsPage() {
  const [dividends, setDividends] = useState<CompanyDividend[]>([])
  const [selectedYeaStats, setSelectedYearStats] = useState<DividendsStats>({
    netDividendEUR: 0,
    netDividendUSD: 0,
    withholdingTaxAmountEUR: 0,
    withholdingTaxAmountUSD: 0,
  })
  const [allYearStats, setAllYearStats] = useState<DividendsStats>({
    netDividendEUR: 0,
    netDividendUSD: 0,
    withholdingTaxAmountEUR: 0,
    withholdingTaxAmountUSD: 0,
  })
  const [selectedYear, setSelectedYear] = useState(ALL_YEARS_KEY)

  useEffect(() => {
    readEToroDividends(selectedYear)
  }, [selectedYear])

  useEffect(() => {
    readAllYearDividendStats()
  }, [])

  return (
    <>
      <h1>Dividends</h1>
      <div className={styles.allYearsInfoPanelContainer}>
        <InfoPanel
          title="Net dividend"
          info={`€${allYearStats.netDividendEUR.toFixed(
            2
          )} - $${allYearStats.netDividendUSD.toFixed(2)}`}
        />
        <InfoPanel
          title="Withholding Tax"
          info={`€${allYearStats.withholdingTaxAmountEUR.toFixed(
            2
          )} - $${allYearStats.withholdingTaxAmountUSD.toFixed(2)}`}
        />
      </div>
      <div className={styles.tabsContainer}>
        <YearTabs
          years={YEARS_TABS}
          selectedYear={selectedYear}
          onClick={(year) => setSelectedYear(year)}
        />
      </div>
      <div className={styles.selectedYearInfoPanelContainer}>
        <InfoPanel
          title="Net dividend"
          info={`€${selectedYeaStats.netDividendEUR.toFixed(
            2
          )} - $${selectedYeaStats.netDividendUSD.toFixed(2)}`}
        />
        <InfoPanel
          title="Withholding Tax"
          info={`€${selectedYeaStats.withholdingTaxAmountEUR.toFixed(
            2
          )} - $${selectedYeaStats.withholdingTaxAmountUSD.toFixed(2)}`}
        />
      </div>
      <DividendsTable dividends={dividends} />
    </>
  )

  async function readEToroDividends(year: number) {
    const dividends = await new DividendsGetter(
      new LocalFileEtoroDividendRepository()
    ).run(year === ALL_YEARS_KEY ? YEARS : [year])
    const selectedYeaStats = await new DividendsStatsGetter(
      new LocalFileEtoroDividendRepository()
    ).run(year === ALL_YEARS_KEY ? YEARS : [year])

    setSelectedYearStats(selectedYeaStats)
    setDividends(dividends)
  }

  async function readAllYearDividendStats() {
    const allYearStats = await new DividendsStatsGetter(
      new LocalFileEtoroDividendRepository()
    ).run(YEARS)
    setAllYearStats(allYearStats)
  }
}

export default DividendsPage
