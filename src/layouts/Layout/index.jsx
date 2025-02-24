import styles from "./Layout.module.css"
import Header from "./Header.jsx"

function Layout({children}) {
  return (
    <main className={styles.main}>
      <Header/>
      {children}
    </main>
  )
}

export default Layout