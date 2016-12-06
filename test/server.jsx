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
});
