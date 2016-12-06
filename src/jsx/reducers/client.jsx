import { Map, List } from "immutable";

import {
  ADD_CLIENT
} from "actions/client";

const INITIAL_STATE = Map({
  list : List.of()
});

export default function(state = INITIAL_STATE, action = {}) {
  switch(action.type) {
    case ADD_CLIENT :
      return state.set("list", state.get("list").push({
        errors : 0,
        clicks : 0,
        latency : 0,
        disk : 0
      }));
    default :
      return state;
  }
}
