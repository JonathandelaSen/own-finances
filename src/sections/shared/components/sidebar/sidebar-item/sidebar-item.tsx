import { clsx } from "clsx"
import styles from "./sidebar-item.module.css"

type Props = {
  text: string
  selected: boolean
  onClick: () => void
}

export const SidebarItem = (params: Props) => (
  <button
    onClick={params.onClick}
    className={clsx(styles.sideBarItem, params.selected && styles.selected)}
  >
    {params.text}
  </button>
)
