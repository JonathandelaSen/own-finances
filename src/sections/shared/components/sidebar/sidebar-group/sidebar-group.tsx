import clsx from "clsx"
import styles from "./sidebar-group.module.css"

type Props = {
  text: string
  children: React.ReactNode
  item: React.ReactNode
  selected: boolean
}

const SidebarGroup = (params: Props) => {
  return (
    <div className={styles.container}>
      <div
        className={clsx(
          styles.itemContainer,
          params.selected && styles.selected
        )}
      >
        {params.item}
        <span className={clsx(styles.item, params.selected && styles.selected)}>
          {params.text}
        </span>
      </div>
      <div className={styles.subItemsContainer}>{params.children}</div>
    </div>
  )
}

export { SidebarGroup }
