export interface Route {
    id: number;
    name: string;
    points: [number, number][];
    track?: [number, number][];
}

export interface RoutesState {
    routes: Route[];
    selectedRouteId: number | null;
    loading: boolean;
    error: string | null;
}