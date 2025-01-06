import { FC } from "react"
import styles from "./info-panel.module.css"

type Props = {
  title: string
  info: string
}

export const InfoPanel: FC<Props> = (params: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.info}>{params.info}</span>
      <span className={styles.title}>{params.title}</span>
    </div>
  )
}
