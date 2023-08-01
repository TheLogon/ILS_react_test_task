import React from "react"
// @ts-ignore
import styles from "./styles/home.module.scss"
import { Provider } from "react-redux"
import store from "./store"
import Map from "./components/Map"
import RoutesTable from "./components/RouteList"

function App() {
	return (
		<Provider store={store}>
			<div className={styles.app}>
				<RoutesTable />
				<Map />
			</div>
		</Provider>
	)
}

export default App
