const {
  named,
  data
} = require("./constants");

const EMPTY_ARRAY = [];

class Metrics {
  constructor() {
    this.metrics = {};
  }
  post(metric) {
    if(data[metric.metric] || named[metric.metric]) {
      const value = data[metric.metric] ? metric.value : 1;
      const r = this.metrics[metric.metric] = this.metrics[metric.metric] || [];
      if(!isNaN(value) && value > 0) {
        r.push({
          date : metric.date,
          value
        });
        return true;
      }
    }
    return false;
  }
  get(args) {
    return (this.metrics[args.metric] || EMPTY_ARRAY);
  }
}

module.exports = Metrics;
