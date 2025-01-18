import { FC } from "react"
import styles from "./year-tabs.module.css"
import clsx from "clsx"

type Props = {
  onClick: (year: number) => void
  years: number[]
  selectedYear: number
}

export const YearTabs: FC<Props> = (params: Props) => {
  return (
    <div className={styles.container}>
      {params.years.map((year) => (
        <button
          className={clsx(
            styles.tab,
            year === params.selectedYear && styles.selected
          )}
          key={year}
          onClick={() => params.onClick(year)}
        >
          {year === 9999 ? "All" : year}
        </button>
      ))}
    </div>
  )
}
