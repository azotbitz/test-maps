export const requestRoute = () => {
    return { type: 'REQUESTED_ROUTE' }
};

export const requestRouteSuccess = (data) => {
    return { type: 'REQUESTED_ROUTE_SUCCEEDED', data: data }
};

export const requestRouteError = () => {
    return { type: 'REQUESTED_ROUTE_FAILED' }
};

export const fetchRoute = (coordinates) => {
    return { type: 'FETCHED_ROUTE', data: coordinates }
};