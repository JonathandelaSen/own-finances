import { useEffect, useState } from "react"
import { CapitalSummaryGetter } from "@modules/capital-summary/application/capital-summary-getter"
import { LocalFileEtoroCapitalSummaryRepository } from "@modules/capital-summary/infrastructure/local-file-etoro-capital-summary-repository"
import styles from "./capital-summary-page.module.css"
import { InfoPanel } from "@sections/shared/components/info-panel/info-panel"
import { CapitalSummary } from "@modules/capital-summary/domain/capital-summary"
import { YearTabs } from "@sections/shared/components/years-tabs/year-tabs"

const ALL_YEARS_KEY = 9999
const YEARS = [2023, 2024, 2025]
const YEARS_TABS = [...YEARS, ALL_YEARS_KEY]

function CapitalSummaryPage() {
  const [selectedYear, setSelectedYear] = useState(ALL_YEARS_KEY)
  const [selectedYeaCapitalSummary, setSelectedYearCapitalSummary] =
    useState<CapitalSummary>()
  const [allYearCapitalSummary, setAllYearCapitalSummary] =
    useState<CapitalSummary>()

  useEffect(() => {
    readAllYearsCapitalSummary()
  }, [])

  useEffect(() => {
    readCapitalSummary(selectedYear)
  }, [selectedYear])

  return (
    <>
      <h1>Capital Summary</h1>
      <div className={styles.InfoPanelContainer}>
        <InfoPanel
          title="Deposits"
          info={`€${allYearCapitalSummary?.deposits.euro.toFixed(
            2
          )} - $${allYearCapitalSummary?.deposits.dollar.toFixed(2)}`}
        />
        <InfoPanel
          title="Dividends"
          info={`€${allYearCapitalSummary?.dividends.euro.toFixed(
            2
          )} - $${allYearCapitalSummary?.dividends.dollar.toFixed(2)}`}
        />
        <InfoPanel
          title="Dividends, profits & commissions"
          info={`€${allYearCapitalSummary?.totalRealizedProfit.euro.toFixed(
            2
          )} - $${allYearCapitalSummary?.totalRealizedProfit.dollar.toFixed(
            2
          )}`}
        />
      </div>
      <div className={styles.tabsContainer}>
        <YearTabs
          years={YEARS_TABS}
          selectedYear={selectedYear}
          onClick={(year) => setSelectedYear(year)}
        />
      </div>
      <div className={styles.InfoPanelContainer}>
        <InfoPanel
          title="Deposits"
          info={`€${selectedYeaCapitalSummary?.deposits.euro.toFixed(
            2
          )} - $${selectedYeaCapitalSummary?.deposits.dollar.toFixed(2)}`}
        />
        <InfoPanel
          title="Dividends"
          info={`€${selectedYeaCapitalSummary?.dividends.euro.toFixed(
            2
          )} - $${selectedYeaCapitalSummary?.dividends.dollar.toFixed(2)}`}
        />
        <InfoPanel
          title="Dividends, profits & commissions"
          info={`€${selectedYeaCapitalSummary?.totalRealizedProfit.euro.toFixed(
            2
          )} - $${selectedYeaCapitalSummary?.totalRealizedProfit.dollar.toFixed(
            2
          )}`}
        />
      </div>
    </>
  )

  async function readAllYearsCapitalSummary() {
    const allYearsCapitalSummary = await new CapitalSummaryGetter(
      new LocalFileEtoroCapitalSummaryRepository()
    ).run(YEARS)
    setAllYearCapitalSummary(allYearsCapitalSummary)
  }
  async function readCapitalSummary(year: number) {
    const capitalSummary = await new CapitalSummaryGetter(
      new LocalFileEtoroCapitalSummaryRepository()
    ).run(year === ALL_YEARS_KEY ? YEARS : [year])

    setSelectedYearCapitalSummary(capitalSummary)
  }
}

export default CapitalSummaryPage
