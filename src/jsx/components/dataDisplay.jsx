import React from "react";
import Metrics from "utils/metrics";
import fulfiller from "utils/metricsPromise";
import { BehaviorSubject } from "rx";
import { dom } from "react-reactive-class";
const { div : Div } = dom;
import {
    data
} from "private/constants";
const {
  LATENCY_METRIC
} = data;

const DataDisplay = () => {
  const metrics = new Metrics(fulfiller);
  const latency$ = new BehaviorSubject("60 fps");
  const runtime$ = new BehaviorSubject(0);
  let total = 0;
  setInterval(() => {
    latency$.onNext(`${total} fps`);
    total = 0;
  }, 1000);
  setInterval(() => {
    total++;
  }, 1000 / 60);
  setInterval(() => {
    metrics.get({
      metric :LATENCY_METRIC
    }).then(data => {
      console.log(data);
    });
    runtime$.onNext(runtime$.getValue() + 1);
  }, 1000);


  return (
    <div>
      <Div>{latency$}</Div>
      <Div>{runtime$.map(runtime => `runtime ${runtime}s`)}</Div>
    </div>
  );
};

export default DataDisplay;
