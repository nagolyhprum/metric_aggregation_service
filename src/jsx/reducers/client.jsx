import { Map, List } from "immutable";

import {
  ADD_CLIENT,
  ADD_ERROR,
  ADD_CLICK,
  ADD_LATENCY,
  ADD_DISK
} from "actions/client";

const CLIENT = Map({
  error : 0,
  click : 0,
  latency : 0,
  disk : 0
});

const INITIAL_STATE = Map({
  list : List.of(...Array.from({ length : 50 }).map(_ => CLIENT))
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
    case ADD_ERROR :
      return update(state, action, "error");
    case ADD_CLICK :
      return update(state, action, "click");
    case ADD_LATENCY :
      return update(state, action, "latency");
    case ADD_DISK :
      return update(state, action, "disk");
    default :
      return state;
  }
}

const update = (state, action, name) => state.set("list", state.get("list").map(client => {
  return client == action.client ? client.set(name, client.get(name) + 1) : client;
}));
