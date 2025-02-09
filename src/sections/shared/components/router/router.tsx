import { Route, Routes } from "react-router"
import DividendsPage from "@sections/dividends/page/dividends-page.tsx"
import PositionsPage from "@sections/positions/page/positions-page.tsx"
import { MainLayout } from "@sections/shared/components/main-layout/main-layout"
import CapitalSummaryPage from "@sections/capital-summary/page/capital-summary-page"

export const HOME_PATH = "/"
export const ETORO_DIVIDENDS_PATH = "/etoro/dividends"
export const ETORO_POSITIONS_PATH = "/etoro/positions"
export const ETORO_CAPITAL_SUMMARY_PATH = "/etoro/capital-summary"

export const IB_DIVIDENDS_PATH = "/ib/dividends"

export const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={HOME_PATH} element={<></>} />
        <Route path={ETORO_POSITIONS_PATH} element={<PositionsPage />} />
        <Route path={ETORO_DIVIDENDS_PATH} element={<DividendsPage />} />
        <Route
          path={ETORO_CAPITAL_SUMMARY_PATH}
          element={<CapitalSummaryPage />}
        />
        <Route path={IB_DIVIDENDS_PATH} element={<></>} />
      </Route>
    </Routes>
  )
}
