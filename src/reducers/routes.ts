import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getTrack } from "../http-services/osrm"
import { RoutesState } from "../app/types"
import { data } from "../data/tableData"

const initialState: RoutesState = {
	routes: data,
	selectedRouteId: null,
	loading: false,
	error: null,
}

export const fetchRouteTrack = createAsyncThunk("routes/fetchRouteTrack", async (points: [number, number][]) => {
	const response = await getTrack(points)
	return response
})

export const routesSlice = createSlice({
	name: "routes",
	initialState,
	reducers: {
		selectRoute(state, action) {
			state.selectedRouteId = action.payload
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchRouteTrack.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchRouteTrack.fulfilled, (state, action) => {
				state.loading = false
				const route = state.routes.find(route => route.id === state.selectedRouteId)
				if (route) {
					route.track = action.payload
				}
			})
			.addCase(fetchRouteTrack.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || "Ошибка при получении трека"
			})
	},
})

export const { selectRoute } = routesSlice.actions

export default routesSlice.reducer
