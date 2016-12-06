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
    if(named[metric.metric]) {
      const r = this.metrics[metric.metric] = this.metrics[metric.metric] || [];
      r.push({
        date : metric.date,
        value : 1
      });
      return true;
    }
    if(data[metric.metric]) {
      const r = this.metrics[metric.metric] = this.metrics[metric.metric] || [];
      if(!isNaN(metric.value) && metric.value > 0) {
        r.push({
          date : metric.date,
          value : metric.value
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
