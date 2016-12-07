import React from "react";
import Metrics from "utils/metrics";
import fulfiller from "utils/metricsPromise";
import { BehaviorSubject } from "rx";
import { dom } from "react-reactive-class";
const { div : Div } = dom;

const DataDisplay = () => {
  const latency$ = new BehaviorSubject("60 fps");
  let total = 0;
  setInterval(() => {
    latency$.onNext(`${total} fps`);
    total = 0;
  }, 1000);
  setInterval(() => {
    total++;
  }, 1000 / 60);

  return (
    <div>
      <Div>{latency$}</Div>
    </div>
  );
};

export default DataDisplay;
