import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import rootReducer from "../reducers"
import { rootSaga } from "../sagas"

const sagaMiddleWare = createSagaMiddleware()

const store = configureStore({
	reducer: rootReducer,
	middleware: [...getDefaultMiddleware(), sagaMiddleWare],
})

sagaMiddleWare.run(rootSaga)

export type AppDispatch = typeof store.dispatch

export default store
