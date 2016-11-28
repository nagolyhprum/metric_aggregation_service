import { Map } from "immutable";

const INITIAL_STATE = Map({
  value : "Hello World"
});

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    default :
      return state;
  }
};
