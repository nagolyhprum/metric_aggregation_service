import React, {
  Component
} from "react";
import { connect } from "react-redux";
import reselect from "utils/reselect";
const {
  mapStateToProps,
  client
} = reselect;

import { dom } from "react-reactive-class";
const { span : Span } = dom;

import {
  addError,
  addClick,
  addLatency,
  addDisk
} from "actions/client";

const metrics = [addError, addClick, addLatency, addDisk];

const ClientStyle = {
  width : 100,
  height : 100,
  border : "1px solid black",
  borderRadius : 10,
  display : "inline-block",
  padding : 10
};

class Client extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.start();
  }
  start() {
    this.timeout = setTimeout(() => {
      this.props.dispatch(metrics[Math.floor(metrics.length * Math.random())](this.props.client.getValue(), Math.random() * 999 + 1));
      this.start();
    }, 100 + Math.random() * 900);
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    const { client } = this.props;
    const $error = client.map(client => client && client.get("error"));
    const $click = client.map(client => client && client.get("click"));
    const $latency = client.map(client => client && client.get("latency"));
    const $disk = client.map(client => client && client.get("disk"));
    return (
      <div style={ClientStyle}>
        <div>errors : <Span>{$error}</Span></div>
        <div>clicks : <Span>{$click}</Span></div>
        <div>latency : <Span>{$latency}</Span></div>
        <div>disk : <Span>{$disk}</Span></div>
      </div>
    );
  }
}

export default connect(mapStateToProps({
  client
}))(Client);
