import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {connect} from "react-redux";
import {watchFetchRoute} from "./sagas/Saga";
import {RouteReducer} from "./reducers/RouteReducer";
import App from '../components/App'

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    RouteReducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(watchFetchRoute);

export const ConnectedApp = connect((state) => {
    return state;
})(App);