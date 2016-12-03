import React, {
  Component
} from "react";
import { connect } from "react-redux";
import reselect from "utils/reselect";
import { dom } from "react-reactive-class";
import {
  setBaseValue
} from "actions/base";
import {
  Subject
} from "rx";
const { div : Div } = dom;
const {
  base,
  index,
  mapStateToProps
} = reselect;

const Base = props => {
  const counter = new Subject();
  counter.scan(count => count + 1, 0).forEach(count => {
    props.setBaseValue(count);
  });
  return (
    <div onClick={() => counter.onNext()}>
      <Div>{props.base}</Div>
      <Div>{props.index}</Div>
    </div>
  );
}

export default connect(mapStateToProps({
  base,
  index
}), {
  setBaseValue
})(Base);
