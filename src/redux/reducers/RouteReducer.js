const initialState = {
    data: '',
    loading: false,
    error: false,
};
export const RouteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUESTED_ROUTE':
            return {
                data: '',
                loading: true,
                error: false,
            };
        case 'REQUESTED_ROUTE_SUCCEEDED':
            return {
                data: action.data,
                loading: false,
                error: false,
            };
        case 'REQUESTED_ROUTE_FAILED':
            return {
                data: '',
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};