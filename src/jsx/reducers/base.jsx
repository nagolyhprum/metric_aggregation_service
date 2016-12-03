import { Map } from "immutable";

import {
  SET_BASE_VALUE
} from "actions/base";

const INITIAL_STATE = Map({
  value : 0
});

export default function(state = INITIAL_STATE, action = {}) {
  switch(action.type) {
    case SET_BASE_VALUE :
      return state.set("value", action.value);
    default :
      return state;
  }
}
