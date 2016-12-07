import React from "react";
import { BehaviorSubject } from "rx";
import { dom } from "react-reactive-class";
const { div : Div } = dom;
import axios from "axios";

const Style = {
  width : 100,
  textAlign : "center",
  color : "white",
  padding : 20,
  borderRadius : 10,
  display : "inline-block",
  textTransform : "uppercase",
  transition : "background 0.25s"
};

const LiveStyle = {
  background : "green",
  ...Style
};

const DeadStyle = {
  background : "red",
  ...Style
};

const updateStatus = bool => {
  return axios.post(`status/${bool ? "live" : "dead"}`);
}

updateStatus(true);

const ServerStatus = props => {

  const status$ = new BehaviorSubject();

  const style$ = status$.map(bool => bool ? LiveStyle : DeadStyle);
  const child$ = status$.map(bool => bool ? "live" : "dead");

  let last = true;
  status$.onNext(last);
  setInterval(() => {
    last = !last;
    updateStatus(last);
    status$.onNext(last);
  }, 5000);

  return <Div style={style$}>{child$}</Div>;
};

export default ServerStatus;
