import {
  createStore,
  applyMiddleware,
  Action,
  AnyAction,
  Dispatch,
  combineReducers
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import {
  routerMiddleware,
  connectRouter,
  RouterState
} from "connected-react-router";
import { StateType } from "typesafe-actions";
import movies, { MoviesState } from "./reducers/movies";

const composeEnhancers = composeWithDevTools({
  trace: true
});

export const history = createBrowserHistory();

export const rootReducer = combineReducers<AppState>({
  router: connectRouter(history),
  movies
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
);

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export interface AppState {
  router: RouterState;
  movies: MoviesState;
}
