import { useState } from "react"
import styles from "./sidebar.module.css"
import { SidebarItem } from "@sections/shared/components/sidebar/sidebar-item/sidebar-item"
import {
  ETORO_DIVIDENDS_PATH,
  ETORO_POSITIONS_PATH,
  ETORO_CAPITAL_SUMMARY_PATH,
  IB_DIVIDENDS_PATH,
} from "@sections/shared/components/router/router"
import { SidebarGroup } from "@sections/shared/components/sidebar/sidebar-group/sidebar-group"
import { EToroIcon } from "@sections/shared/components/icons/e-toro"
import React from "react"

export const Sidebar = () => {
  const MENU_ITEMS = [
    {
      text: "Etoro",
      subpath: "etoro",
      icon: <EToroIcon height={22} width={22} strokeWidth={2} />,
      subItems: [
        {
          text: "Dividends",
          path: ETORO_DIVIDENDS_PATH,
        },
        {
          text: "Positions",
          path: ETORO_POSITIONS_PATH,
        },
        {
          text: "Capital Summary",
          path: ETORO_CAPITAL_SUMMARY_PATH,
        },
      ],
    },
    {
      text: "IB",
      subpath: "ib",
      subItems: [
        {
          text: "Dividends",
          path: IB_DIVIDENDS_PATH,
        },
      ],
    },
  ]
  const [selected, setSelected] = useState(MENU_ITEMS[0].subItems[0].path)

  return (
    <aside className={styles.sideBar}>
      <div className={styles.sideBarContainer}>
        {MENU_ITEMS.map((item) => (
          <SidebarGroup
            text={item.text}
            selected={selected.includes(item.subpath)}
            item={
              item.icon
                ? React.cloneElement(item.icon, {
                    strokeWidth: selected.includes(item.subpath) ? 3 : 2,
                  })
                : null
            }
          >
            {item.subItems.map((subItem) => (
              <SidebarItem
                text={subItem.text}
                path={subItem.path}
                selected={selected === subItem.path}
                onClick={() => setSelected(subItem.path)}
              />
            ))}
          </SidebarGroup>
        ))}
      </div>
    </aside>
  )
}
