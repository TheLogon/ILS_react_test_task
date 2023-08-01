import React from "react"
import { useSelector } from "react-redux"
import { Table } from "antd"
import { selectRoutes, selectSelectedRouteId } from "../../selectors/routeSelectors"
import { selectRoute } from "../../reducers/routes"
import { useAppDispatch } from "../../app/hooks"
// @ts-ignore
import styles from "../../styles/home.module.scss"

function RoutesTable() {
	const routes = useSelector(selectRoutes)
	const selectedRouteId = useSelector(selectSelectedRouteId)
	const dispatch = useAppDispatch()

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Название",
			dataIndex: "name",
			key: "name",
		},
	]

	const handleRowClick = (record: any) => {
		dispatch(selectRoute(record.id))
	}

	return (
		<div className={styles.table}>
			<Table
				columns={columns}
				dataSource={routes}
				rowKey="id"
				pagination={false}
				rowClassName={record => (record.id === selectedRouteId ? styles.selected : "")}
				onRow={record => ({
					onClick: () => handleRowClick(record),
				})}
			/>
		</div>
	)
}

export default RoutesTable
