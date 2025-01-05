import { FC } from "react"
import styles from "./year-tabs.module.css"

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
          className={year === params.selectedYear ? styles.selected : ""}
          key={year}
          onClick={() => params.onClick(year)}
        >
          {year}
        </button>
      ))}
    </div>
  )
}
