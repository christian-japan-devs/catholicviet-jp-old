import React, { Component } from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import checkinReducer from "./store/reducers/checkin";

import RootRouters from "./RootRoutes";
import AppContext from "./appContext";
import { BrowserRouter as Router } from "react-router-dom";

const rootReducer = combineReducers({
  checkin: checkinReducer,
});
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppContext.Provider value={{ RootRouters }}>
        <Provider store={store}>
          <Router>
            <RootRouters />
          </Router>
        </Provider>
      </AppContext.Provider>
    );
  }
}
