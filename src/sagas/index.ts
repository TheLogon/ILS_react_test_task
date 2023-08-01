import { all } from "redux-saga/effects"
import { watchRoutesSaga } from "./route"

export function* rootSaga() {
	yield all([watchRoutesSaga()])
}
