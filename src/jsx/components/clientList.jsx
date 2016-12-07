import React from "react";
import Client from "components/client";
import { connect } from "react-redux";
import reselect from "utils/reselect";
import { dom } from "react-reactive-class";
import {
  addClient
} from "actions/client";
const { div : Div } = dom;
const {
  mapStateToProps,
  clients
} = reselect;

const ClientList = props => {
  return (
    <div>
      <div onClick={props.addClient}>Add</div>
      <Div>{props.clients.map(clients => clients && clients.map((_, i) => <Client index={i}/>))}</Div>
    </div>
  );
};

export default connect(mapStateToProps({
  clients
}), {
  addClient
})(ClientList);
