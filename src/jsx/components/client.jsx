import React, {
  Component
} from "react";
import { connect } from "react-redux";

import { dom } from "react-reactive-class";
const { span : Span } = dom;

const ClientStyle = {
  width : 100,
  height : 100,
  border : "1px solid black",
  borderRadius : 10,
  display : "inline-block",
  padding : 10
}

class Client extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.start();
  }
  start() {
    this.timeout = setTimeout(() => {

      this.start();
    });
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    const { client } = this.props;
    return (
      <div style={ClientStyle}>
        <div>errors : {client.errors}</div>
        <div>clicks : {client.clicks}</div>
        <div>latency : {client.latency}</div>
        <div>disk : {client.disk}</div>
      </div>
    );
  }
}

export default connect()(Client);
