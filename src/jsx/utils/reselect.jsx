import { createSelector } from "reselect";
import { Subject } from "rx";

const withoutProps = (...inputs) => {
  const subject$ = new Subject();
  const selector = createSelector(inputs, input => {
    setTimeout(() => {
      subject$.onNext(input);
    });
    return subject$;
  });
  return () => selector;
};

const withProps = (...inputs) => () => withoutProps(...inputs)();

const mapStateToProps = observables => {
  observables = Object.keys(observables).reduce((map, key) => ({
    ...map,
    [key] : observables[key]()
  }), {});
  return (state, props) => Object.keys(observables).reduce((map, key) => ({
    ...map,
    [key] : observables[key](state, props)
  }), {});
};

const base = state => state.getIn(["base", "value"]);
const index = (state, props) => props.index;

export default {
  base : withoutProps(base),
  index : withProps(index),
  mapStateToProps
};
