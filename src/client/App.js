import React from "react"
import logo from "../logo.svg"
import styles from "./App.scss"

const App = () => (
    <div className={styles.app}>
        <div className={styles.app_header}>
            <img src={logo} className={styles.app_logo} alt="logo" />
            <h2>Welcome to React</h2>
        </div>
        <p className={styles.app_intro}>
            To get started, edit <code>src/App.js</code> and save to reload
        </p>
    </div>
)

export default App
