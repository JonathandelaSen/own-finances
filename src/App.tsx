import "./App.css"
import { useEffect, useState } from "react"

import { DividendsGetter } from "./modules/dividends/application/dividends-getter"
import { CompanyDividend } from "@modules/dividends/domain/company-dividend"
import { LocalFileEtoroDividendRepository } from "@modules/dividends/infrastructure/local-file-etoro-dividend-repository"
import { DividendsTable } from "@sections/dividends/components/dividends-table/dividends-table"
import { YearTabs } from "@sections/dividends/components/years-tabs/year-tabs"
import { InfoPanel } from "@sections/shared/components/info-panel/info-panel"
import styles from "./dividends.module.css"
import { DividendsStatsGetter } from "@modules/dividends/application/dividends-stats-getter"
import { DividendsStats } from "@modules/dividends/domain/dividends-stats"
import { PositionsGetter } from "@modules/positions/application/positions-getter"
import { LocalFileEtoroPositionRepository } from "@modules/positions/infrastructure/local-file-etoro-position-repository"
import { Position } from "@modules/positions/domain/position"
import { PositionsTable } from "@sections/positions/components/positions-table/positions-table"

const ALL_YEARS_KEY = 9999
const YEARS = [2023, 2024]
const YEARS_TABS = [...YEARS, ALL_YEARS_KEY]

function App() {
  const [dividends, setDividends] = useState<CompanyDividend[]>([])
  const [positions, setPositions] = useState<Position[]>([])
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
  const [selectedYear, setSelectedYear] = useState(YEARS[0])

  useEffect(() => {
    readEToroDividends(selectedYear)
  }, [selectedYear])

  useEffect(() => {
    readAllYearDividendStats()
    readEtoroPositions()
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
      <h1>Positions</h1>
      <PositionsTable positions={positions} />
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

  async function readEtoroPositions() {
    const positions = await new PositionsGetter(
      new LocalFileEtoroPositionRepository(YEARS)
    ).run()
    setPositions(positions)
  }
}

export default App
