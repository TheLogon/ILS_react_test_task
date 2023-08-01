import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../reducers"

export const selectRoutesState = (state: RootState) => state.route

export const selectRoutes = createSelector(selectRoutesState, state => state.routes)

export const selectSelectedRouteId = createSelector(selectRoutesState, state => state.selectedRouteId)

export const selectSelectedRoute = createSelector(selectRoutesState, state => state.routes.find(route => route.id === state.selectedRouteId))

export const selectLoading = createSelector(selectRoutesState, state => state.loading)

export const selectError = createSelector(selectRoutesState, state => state.error)
