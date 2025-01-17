import { Route, Routes } from "react-router"
import DividendsPage from "@sections/dividends/page/dividends-page.tsx"
import PositionsPage from "@sections/positions/page/positions-page.tsx"
import { MainLayout } from "@sections/shared/components/main-layout/main-layout"

export const HOME_PATH = "/"
export const DIVIDENDS_PATH = "/dividends"
export const POSITIONS_PATH = "/positions"

export const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={HOME_PATH} element={<></>} />
        <Route path={POSITIONS_PATH} element={<PositionsPage />} />
        <Route path={DIVIDENDS_PATH} element={<DividendsPage />} />
      </Route>
    </Routes>
  )
}
