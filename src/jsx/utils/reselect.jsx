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

const mapStateToProps = observables => () => {
  const instances = Object.keys(observables).reduce((map, key) => Object.assign({}, map, {
    [key] : observables[key]()
  }), {});
  return (state, props) => Object.keys(instances).reduce((map, key) => Object.assign({}, map, {
    [key] : props[key] || instances[key](state, props)
  }), {});
};

const clients = state => state.getIn(["client", "list"]);
const index = (state, props) => props.index;
const client = createSelector(index, clients, (index, clients) => clients.get(index));

export default {
  client : withProps(client),
  clients : withState(clients),
  mapStateToProps
};
