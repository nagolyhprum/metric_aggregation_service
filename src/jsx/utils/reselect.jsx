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

const clients = state => state.getIn(["client", "list"]);

export default {
  clients : withState(clients),
  mapStateToProps
};
