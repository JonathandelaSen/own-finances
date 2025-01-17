import { clsx } from "clsx"
import styles from "./sidebar-item.module.css"
import { NavLink } from "react-router"

type Props = {
  text: string
  path: string
  selected: boolean
  onClick: () => void
}

export const SidebarItem = (params: Props) => (
  <NavLink
    onClick={params.onClick}
    className={clsx(styles.sideBarItem, params.selected && styles.selected)}
    to={params.path}
    end
  >
    {params.text}
  </NavLink>
)
