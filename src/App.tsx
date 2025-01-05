import "./App.css"
import { useEffect, useState } from "react"

import { DividendGetter } from "./modules/dividends/application/dividend-getter"
import { CompanyDividend } from "@modules/dividends/domain/company-dividend"
import { LocalFileEtoroDividendRepository } from "@modules/dividends/infrastructure/local-file-etoro-dividend-repository"
import { DividendsTable } from "@sections/dividends/components/dividends-table/dividends-table"
import { YearTabs } from "@sections/dividends/components/years-tabs/year-tabs"

const YEARS = [2023, 2024]
function App() {
  const [dividends, setDividends] = useState<CompanyDividend[]>([])
  const [selectedYear, setSelectedYear] = useState(YEARS[0])

  useEffect(() => {
    readEToro(selectedYear)
  }, [selectedYear])

  return (
    <>
      <h1>Dividends</h1>
      <YearTabs
        years={YEARS}
        selectedYear={selectedYear}
        onClick={(year) => setSelectedYear(year)}
      />
      <DividendsTable dividends={dividends} />
    </>
  )

  async function readEToro(year: number) {
    const getter = new DividendGetter(new LocalFileEtoroDividendRepository())
    const dividends = await getter.run(year)
    setDividends(dividends)
  }
}

export default App
