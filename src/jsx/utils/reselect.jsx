import { createSelector } from "reselect";
import { BehaviorSubject } from "rx";

const withState = (...inputs) => {
  const subject$ = new BehaviorSubject();
  const selector = createSelector(inputs, input => {
    setTimeout(() => subject$.onNext(input));
    return subject$;
  });
  return () => selector;
};

const withProps = (...inputs) => () => withState(...inputs)();

const mapStateToProps = observables => {
  observables = Object.keys(observables).reduce((map, key) => Object.assign({}, map, {
    [key] : observables[key]()
  }), {});
  return (state, props) => Object.keys(observables).reduce((map, key) => Object.assign({}, map, {
    [key] : props[key] || observables[key](state, props)
  }), {});
};

const base = state => state.getIn(["base", "value"]);
const index = (state, props) => props.index;

export default {
  base : withState(base),
  index : withProps(index),
  mapStateToProps
};
