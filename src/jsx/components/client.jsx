import React, {
  Component
} from "react";
import { connect } from "react-redux";

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
      this.props.dispatch(metrics[Math.floor(metrics.length * Math.random())](this.props.client, Math.random() * 999 + 1));
      this.start();
    }, 100 + Math.random() * 900);
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    const { client } = this.props;
    return (
      <div style={ClientStyle}>
        <div>errors : {client.get("error")}</div>
        <div>clicks : {client.get("click")}</div>
        <div>latency : {client.get("latency")}</div>
        <div>disk : {client.get("disk")}</div>
      </div>
    );
  }
}

export default connect()(Client);
