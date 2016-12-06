const {
  named
} = require("./constants");

const EMPTY_ARRAY = [];

class Metrics {
  constructor() {
    this.metrics = {};
  }
  post(metric) {
    if(named[metric.metric]) {
      const r = this.metrics[metric.metric] = this.metrics[metric.metric] || [];
      r.push({
        date : metric.date,
        data : 1
      });
      return true;
    }
    return false;
  }
  get(metric, start, end) {
    return (this.metrics[metric] || EMPTY_ARRAY);
  }
}

module.exports = Metrics;
