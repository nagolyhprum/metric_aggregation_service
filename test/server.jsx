import { expect } from "chai";

import Metrics from "../private/metrics";
import { named, data} from "../private/constants";
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
    const result = metrics.get();
    expect(result).to.have.length(0);
  });
  it("can add a named metric", () => {
    const metrics = new Metrics();
    const date = new Date().getTime();
    const post = metrics.post({
      metric : ERROR_METRIC,
      date
    });
    const get = metrics.get(ERROR_METRIC);
    expect(post).to.be.equal(true);
    expect(get).to.have.length(1);
    expect(get[0]).to.be.deep.equal({
      date,
      data : 1
    })
  });
  it("named metrics cannot alter their data", () => {
    const metrics = new Metrics();
    const date = new Date().getTime();
    metrics.post({
      metric : ERROR_METRIC,
      date,
      data : 50
    });
    const get = metrics.get(ERROR_METRIC);
    expect(get[0]).to.be.deep.equal({
      date,
      data : 1
    })
  });
});
