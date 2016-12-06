import React from "react";
import ReactDOM from "react-dom";
import MetricClient from "components/metricClient";
import { createStore } from "redux";
import { combineReducers } from "redux-immutable";
import reducers from "../reducers/index";
import { Map } from "immutable";
import { Provider } from "react-redux";

const initialState = Map();
const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer, initialState);

const div = document.createElement("div");
document.body.appendChild(div);

ReactDOM.render(
  <Provider store={store}>
    <MetricClient/>
  </Provider>,
  div
);
