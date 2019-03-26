import {
  createStore,
  applyMiddleware,
  Action,
  AnyAction,
  Dispatch,
  combineReducers
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createHashHistory } from "history";
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
import { seancesReducer } from "./reducers/seances";
import { SeancesState } from "./seances/types";
import seancesSaga from "./seances/sagas";
import { CinemasState } from "./cinemas/types";
import { cinemasReducer } from "./reducers/cinemas";
import cinemasSaga from "./cinemas/sagas";

const composeEnhancers = composeWithDevTools({
  trace: true
});

export const history = createHashHistory();

export const rootReducer = combineReducers<AppState>({
  router: connectRouter(history),
  movies: moviesReducer,
  seances: seancesReducer,
  cinemas: cinemasReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export interface AppState {
  router: RouterState;
  movies: MoviesState;
  seances: SeancesState;
  cinemas: CinemasState;
}

export function* rootSaga() {
  yield all([fork(moviesSaga), fork(seancesSaga), fork(cinemasSaga)]);
}
