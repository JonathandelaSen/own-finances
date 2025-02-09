type Props = {
  text: string
  children: React.ReactNode
  selected: boolean
}

import clsx from "clsx"
import styles from "./sidebar-group.module.css"

const SidebarGroup = (params: Props) => {
  return (
    <div className={styles.container}>
      <span className={clsx(styles.item, params.selected && styles.selected)}>
        {params.text}
      </span>
      <div className={styles.subItemsContainer}>{params.children}</div>
    </div>
  )
}

export { SidebarGroup }
