import axios from "axios"

/**
 * С OSRM возник баг, по заданным координатам он выдает некорректные данные для треков, при этом, если скармливать другие координаты, то работает корректно
 */

const osrmApi = axios.create({
	baseURL: "https://router.project-osrm.org",
})

export const getTrack = async (points: [number, number][]) => {
	const coordinates = points?.map(point => point.join(",")).join(";")
	const response = await osrmApi.get(`/route/v1/driving/${coordinates}?overview=full&geometries=geojson`)
	return response.data.routes[0].geometry.coordinates
}
