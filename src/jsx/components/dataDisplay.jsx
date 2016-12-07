import React from "react";
import Metrics from "utils/metrics";
import fulfiller from "utils/metricsPromise";
import { BehaviorSubject } from "rx";
import { dom } from "react-reactive-class";
const { div : Div, span : Span } = dom;
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
  const responseTime$ = new BehaviorSubject("0ms");
  const data$ = new BehaviorSubject({
    max : 0,
    min : 0,
    sum : 0,
    average : 0
  });
  let total = 0;
  setInterval(() => {
    latency$.onNext(`${total} fps`);
    total = 0;
  }, 1000);
  setInterval(() => {
    total++;
  }, 1000 / 60);
  setInterval(() => {
    const now = new Date();
    metrics.get({
      metric :LATENCY_METRIC
    }).then(data => {
      const key = Object.keys(data).pop();
      data$.onNext(data[key]);
      responseTime$.onNext(`response time ${new Date() - now}ms`);
    }).catch(_ => _);
    runtime$.onNext(runtime$.getValue() + 1);
  }, 1000);

  const max$ = data$.map(data => data.max);
  const min$ = data$.map(data => data.min);
  const sum$ = data$.map(data => data.sum);
  const average$ = data$.map(data => data.average);

  return (
    <div>
      <Div>{latency$}</Div>
      <Div>{responseTime$}</Div>
      <Div>{runtime$.map(runtime => `runtime ${runtime}s`)}</Div>
      <div>
        <div>Max : <Span>{max$}</Span></div>
        <div>Min : <Span>{min$}</Span></div>
        <div>Sum : <Span>{sum$}</Span></div>
        <div>Average : <Span>{average$}</Span></div>
      </div>
    </div>
  );
};

export default DataDisplay;
