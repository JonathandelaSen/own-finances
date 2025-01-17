import { useState } from "react"
import styles from "./sidebar.module.css"
import { SidebarItem } from "@sections/shared/components/sidebar/sidebar-item/sidebar-item"

const MENU_ITEMS = [
  {
    text: "Dividends",
  },
  {
    text: "Positions",
  },
]
export const Sidebar = () => {
  const [selected, setSelected] = useState(MENU_ITEMS[0].text)

  return (
    <aside className={styles.sideBar}>
      <div className={styles.sideBarContainer}>
        {MENU_ITEMS.map((item) => (
          <SidebarItem
            text={item.text}
            selected={selected === item.text}
            onClick={() => setSelected(item.text)}
          />
        ))}
      </div>
    </aside>
  )
}
