import { Map, List } from "immutable";

import {
  ADD_CLIENT
} from "actions/client";

import {
    named,
    data
} from "private/constants";
const {
  ERROR_METRIC,
  CLICK_METRIC
} = named;
const {
  LATENCY_METRIC,
  DISK_METRIC
} = data;

const CLIENT = Map({
  error : 0,
  click : 0,
  latency : 0,
  disk : 0
});

const INITIAL_STATE = Map({
  list : List.of(...Array.from({ length : 1 }).map(_ => CLIENT))
});

export default function(state = INITIAL_STATE, action = {}) {
  switch(action.type) {
    case ADD_CLIENT :
      return state.set("list", state.get("list").push(Map({
        error : 0,
        click : 0,
        latency : 0,
        disk : 0
      })));
    case ERROR_METRIC:
      return update(state, action, "error");
    case CLICK_METRIC :
      return update(state, action, "click");
    case LATENCY_METRIC :
      return update(state, action, "latency");
    case DISK_METRIC :
      return update(state, action, "disk");
    default :
      return state;
  }
}

const update = (state, action, name) => state.set("list", state.get("list").map(client => {
  return client == action.client ? client.set(name, client.get(name) + 1) : client;
}));
