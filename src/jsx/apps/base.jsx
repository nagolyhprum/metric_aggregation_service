import React from "react";
import ReactDOM from "react-dom";
import Base from "../components/base";
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
    <div>
      <Base index={1}></Base>
      <Base index={2}></Base>
    </div>
  </Provider>,
  div
);
