import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import checkinReducer from "./store/reducers/checkin";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  checkin: checkinReducer,
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const qrapp = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(qrapp, document.getElementById("qr-app"));
