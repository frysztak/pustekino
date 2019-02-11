import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainPage from "./pages/MainPage";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router"; // react-router v4
import { ConnectedRouter } from "connected-react-router";
import { history, store } from "./redux/store";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route render={() => <div>Miss</div>} />
        </Switch>
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
