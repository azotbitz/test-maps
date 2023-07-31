import {takeEvery} from "redux-saga/effects";
import {put, call} from "redux-saga/effects"
import {requestRoute, requestRouteSuccess, requestRouteError} from "../actionsCreators/Actions";

export function* watchFetchRoute() {
    yield takeEvery('FETCHED_ROUTE', fetchRouteAsync);
}

export function* fetchRouteAsync(coordinates) {
    try {
        yield put(requestRoute());
        const data = yield call(() => {
                return fetch(`http://router.project-osrm.org/route/v1/foot/${coordinates.data[0]}?geometries=geojson&overview=simplified`)
                    .then(res => res.json())
            }
        );
        const dataSecond = yield call(() => {
                return fetch(`http://router.project-osrm.org/route/v1/foot/${coordinates.data[1]}?geometries=geojson&overview=simplified`)
                    .then(res => res.json())
            }
        );
        const data2 = yield call(() => {
                return fetch(`http://router.project-osrm.org/route/v1/foot/${coordinates.data[2]}?geometries=geojson&overview=simplified`)
                    .then(res => res.json())
            }
        );
        const data2Second = yield call(() => {
                return fetch(`http://router.project-osrm.org/route/v1/foot/${coordinates.data[3]}?geometries=geojson&overview=simplified`)
                    .then(res => res.json())
            }
        );
        const data3 = yield call(() => {
                return fetch(`http://router.project-osrm.org/route/v1/foot/${coordinates.data[4]}?geometries=geojson&overview=simplified`)
                    .then(res => res.json())
            }
        );
        const data3Second = yield call(() => {
                return fetch(`http://router.project-osrm.org/route/v1/foot/${coordinates.data[5]}?geometries=geojson&overview=simplified`)
                    .then(res => res.json())
            }
        );
        yield put(requestRouteSuccess([[data, dataSecond], [data2, data2Second], [data3, data3Second]]));
    } catch (error) {
        yield put(requestRouteError());
    }
}