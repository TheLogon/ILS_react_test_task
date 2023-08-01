import { combineReducers } from "@reduxjs/toolkit"
import routeReducer from "./routes"

const rootReducer = combineReducers({
	route: routeReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
