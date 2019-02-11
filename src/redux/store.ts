import {
  createStore,
  applyMiddleware,
  Action,
  AnyAction,
  Dispatch,
  combineReducers
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";
import {
  routerMiddleware,
  connectRouter,
  RouterState
} from "connected-react-router";
import { moviesReducer } from "./reducers/movies";
import { MoviesState } from "./movies/types";
import moviesSaga from "./movies/sagas";
import { fork, all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";

const composeEnhancers = composeWithDevTools({
  trace: true
});

export const history = createBrowserHistory();

export const rootReducer = combineReducers<AppState>({
  router: connectRouter(history),
  movies: moviesReducer
});

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(rootSaga)

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export interface AppState {
  router: RouterState;
  movies: MoviesState;
}

export function* rootSaga() {
  yield all([fork(moviesSaga)])
}