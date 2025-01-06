import "./App.css"
import { useEffect, useState } from "react"

import { DividendsGetter } from "./modules/dividends/application/dividends-getter"
import { CompanyDividend } from "@modules/dividends/domain/company-dividend"
import { LocalFileEtoroDividendRepository } from "@modules/dividends/infrastructure/local-file-etoro-dividend-repository"
import { DividendsTable } from "@sections/dividends/components/dividends-table/dividends-table"
import { YearTabs } from "@sections/dividends/components/years-tabs/year-tabs"
import { InfoPanel } from "@sections/shared/components/info-panel"
import styles from "./dividends.module.css"
import { DividendsStatsGetter } from "@modules/dividends/application/dividends-stats-getter"
import { DividendsStats } from "@modules/dividends/domain/dividends-stats"

const YEARS = [2023, 2024]
function App() {
  const [dividends, setDividends] = useState<CompanyDividend[]>([])
  const [allYearStats, setAllYearStats] = useState<DividendsStats>({
    netDividendEUR: 0,
    netDividendUSD: 0,
    withholdingTaxAmountEUR: 0,
    withholdingTaxAmountUSD: 0,
  })
  const [selectedYear, setSelectedYear] = useState(YEARS[0])

  useEffect(() => {
    readEToro(selectedYear)
  }, [selectedYear])

  useEffect(() => {
    readAllYearStats()
  }, [])

  return (
    <>
      <h1>Dividends</h1>
      <div className={styles.infoPanelContainer}>
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
          years={YEARS}
          selectedYear={selectedYear}
          onClick={(year) => setSelectedYear(year)}
        />
      </div>
      <DividendsTable dividends={dividends} />
    </>
  )

  async function readEToro(year: number) {
    const getter = new DividendsGetter(new LocalFileEtoroDividendRepository())
    const dividends = await getter.run([year])
    setDividends(dividends)
  }

  async function readAllYearStats() {
    const allYearStats = await new DividendsStatsGetter(
      new LocalFileEtoroDividendRepository()
    ).run(YEARS)
    setAllYearStats(allYearStats)
  }
}

export default App
