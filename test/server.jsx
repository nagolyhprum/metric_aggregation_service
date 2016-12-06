import { expect } from "chai";

import Metrics from "../private/metrics";
import { named, data, MINUTE } from "../private/constants";
const {
  ERROR_METRIC,
  CLICK_METRIC
} = named;
const {
  LATENCY_METRIC,
  DISK_METRIC
} = data;

describe("metrics", () => {
  it("will error out", () => {
    const metrics = new Metrics();
    const result = metrics.post({
      metric : "DNE_METRIC"
    });
    expect(result).to.be.equal(false);
  });
  it("can have no data", () => {
    const metrics = new Metrics();
    const result = metrics.get({
      metric : "DNE_METRIC"
    });
    expect(result).to.be.deep.equal({});
  });
  it("can add a named metric", () => {
    const metrics = new Metrics();
    const date = new Date().getTime();
    const post = metrics.post({
      metric : ERROR_METRIC,
      date
    });
    const get = metrics.get({
      metric : ERROR_METRIC
    });
    expect(post).to.be.equal(true);
    expect(get).to.be.deep.equal({
      [Metrics.getIndex(date)] : {
        sum : 1
      }
    })
  });
  it("named metrics cannot alter their value", () => {
    const metrics = new Metrics();
    const date = new Date().getTime();
    metrics.post({
      metric : ERROR_METRIC,
      date,
      value : 50
    });
    const get = metrics.get({
      metric : ERROR_METRIC
    });
    expect(get).to.be.deep.equal({
      [Metrics.getIndex(date)] : {
        sum : 1
      }
    });
  });
  it("data metrics require positive data", () => {
    const metrics = new Metrics();
    const date = new Date().getTime();
    const a = metrics.post({
      metric : LATENCY_METRIC,
      date
    });
    const b = metrics.post({
      metric : LATENCY_METRIC,
      date,
      value : 0
    });
    const c = metrics.post({
      metric : LATENCY_METRIC,
      date,
      value : -5
    });
    const d = metrics.post({
      metric : LATENCY_METRIC,
      date,
      value : 5
    });
    const get = metrics.get({
      metric : LATENCY_METRIC
    });
    expect(a).to.be.equal(false);
    expect(b).to.be.equal(false);
    expect(c).to.be.equal(false);
    expect(d).to.be.equal(true);
    expect(get).to.be.deep.equal({
      [Metrics.getIndex(date)] : {
        sum : 5,
        average : 5,
        min : 5,
        max : 5
      }
    });
  });
  it("date is required", () => {
    const metrics = new Metrics();
    const result = metrics.post({
      metric : LATENCY_METRIC,
      value : 5
    });
    expect(result).to.be.equal(false)
  });
  it("can add multiple metrics", () => {
    const metrics = new Metrics();
    const length = 10;
    const total = (length * (length + 1)) / 2;
    const date = new Date().getTime();
    Array.from({length}).forEach((_, i) => {
      metrics.post({
        metric : ERROR_METRIC,
        value : i + 1,
        date
      });
      metrics.post({
        metric : LATENCY_METRIC,
        value : i + 1,
        date
      });
      metrics.post({
        metric : DISK_METRIC,
        value : length - i,
        date
      });
    });
    const name = metrics.get({ metric : ERROR_METRIC });
    const increasing = metrics.get({ metric : LATENCY_METRIC });
    const descreasing = metrics.get({ metric : DISK_METRIC });
    expect(name).to.be.deep.equal({
      [Metrics.getIndex(date)] : {
        sum : length
      }
    });
    expect(increasing).to.be.deep.equal({
      [Metrics.getIndex(date)] : {
        sum : total,
        max : length,
        min : 1,
        average : total / length
      }
    });
    expect(descreasing).to.be.deep.equal({
      [Metrics.getIndex(date)] : {
        sum : total,
        max : length,
        min : 1,
        average : total / length
      }
    });
  });
  it("can omit filters", () => {
    const metrics = new Metrics();
    const date = new Date().getTime();
    metrics.post({
      metric : ERROR_METRIC,
      date
    });
    const from = metrics.get({
      metric : ERROR_METRIC,
      from : date + 1
    });
    const to = metrics.get({
      metric : ERROR_METRIC,
      to : date
    });
    const get = metrics.get({
      metric : ERROR_METRIC
    });
    expect(from).to.be.deep.equal({});
    expect(to).to.be.deep.equal({});
    expect(get).to.be.deep.equal({
      [Metrics.getIndex(date)] : {
        sum : 1
      }
    })
  });
});
