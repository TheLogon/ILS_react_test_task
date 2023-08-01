import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
// @ts-ignore
import marker from "leaflet/dist/images/marker-icon.png"
import { selectSelectedRoute, selectLoading, selectError } from "../../selectors/routeSelectors"
import { fetchRouteTrack } from "../../reducers/routes"
import { useAppDispatch } from "../../app/hooks"
// @ts-ignore
import styles from "../../styles/home.module.scss"

function Map() {
	const mapRef = useRef<L.Map | null>(null)
	const route = useSelector(selectSelectedRoute)
	const loading = useSelector(selectLoading)
	const error = useSelector(selectError)
	const dispatch = useAppDispatch()

	useEffect(() => {
		mapRef.current = L.map("map", {
			center: [55.75, 37.57],
			zoom: 10,
		})

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
		}).addTo(mapRef.current)

		return () => {
			mapRef.current?.remove()
		}
	}, [])

	useEffect(() => {
		if (route) {
			// @ts-ignore
			dispatch(fetchRouteTrack(route.points))
		}
	}, [JSON.stringify(route), dispatch])

	useEffect(() => {
		if (route && route.track) {
			const polyline = L.polyline(route.track, { color: "red" }).addTo(mapRef.current!)
			const markers = route.points.map(point =>
				L.marker(point, {
					icon: L.icon({
						iconUrl: marker,
						iconSize: [25, 41],
						iconAnchor: [12.5, 41],
						popupAnchor: [0, -41],
					}),
				})
			)
			const group = L.featureGroup(markers).addTo(mapRef.current!)
			mapRef.current!.fitBounds(polyline.getBounds())

			return () => {
				mapRef.current?.removeLayer(polyline)
				mapRef.current?.removeLayer(group)
			}
		}
	}, [route])

	return (
		<div className={styles.map} id="map">
			{loading && <div className={styles.loading}>Загрузка...</div>}
			{error && <div className={styles.error}>{error}</div>}
		</div>
	)
}

export default Map
