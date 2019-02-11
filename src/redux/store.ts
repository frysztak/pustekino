import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createRootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

const composeEnhancers = composeWithDevTools({
  trace: true
});

export const history = createBrowserHistory();

const store = createStore(
  createRootReducer(history),
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
);

export default store;
