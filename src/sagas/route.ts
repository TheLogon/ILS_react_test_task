import { takeEvery, put } from "redux-saga/effects"
import { PayloadAction } from "@reduxjs/toolkit"
import { fetchRouteTrack } from "../reducers/routes"
import { selectRoute } from "../reducers/routes"

function* handleFetchRouteTrack(action: PayloadAction<[number, number][]>) {
	try {
		// @ts-ignore
		yield put(fetchRouteTrack(action.payload))
	} catch (error) {
		console.error(error)
	}
}

export function* watchRoutesSaga() {
	yield takeEvery(selectRoute.type, handleFetchRouteTrack)
}
