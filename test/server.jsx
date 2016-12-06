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
});
