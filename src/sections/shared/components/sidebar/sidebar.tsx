import { useState } from "react"
import styles from "./sidebar.module.css"
import { SidebarItem } from "@sections/shared/components/sidebar/sidebar-item/sidebar-item"
import {
  DIVIDENDS_PATH,
  POSITIONS_PATH,
  CAPITAL_SUMMARY_PATH,
} from "@sections/shared/components/router/router"

export const Sidebar = () => {
  const MENU_ITEMS = [
    {
      text: "Dividends",
      path: DIVIDENDS_PATH,
    },
    {
      text: "Positions",
      path: POSITIONS_PATH,
    },
    {
      text: "Capital Summary",
      path: CAPITAL_SUMMARY_PATH,
    },
  ]
  const [selected, setSelected] = useState(MENU_ITEMS[0].text)

  return (
    <aside className={styles.sideBar}>
      <div className={styles.sideBarContainer}>
        {MENU_ITEMS.map((item) => (
          <SidebarItem
            text={item.text}
            path={item.path}
            selected={selected === item.text}
            onClick={() => setSelected(item.text)}
          />
        ))}
      </div>
    </aside>
  )
}
