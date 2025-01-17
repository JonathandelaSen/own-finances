import { Sidebar } from "@sections/shared/components/sidebar/sidebar"
import { Outlet } from "react-router"
import styles from "./main-layout.module.css"

export const MainLayout = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  )
}
