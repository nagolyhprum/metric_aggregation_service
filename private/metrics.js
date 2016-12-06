const {
  named,
  data,
  MINUTE
} = require("./constants");

const EMPTY_ARRAY = [];

class Metrics {
  constructor() {
    this.metrics = {};
  }
  static getIndex(date) {
    return Math.floor(date / MINUTE);
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
    const r = this.metrics[args.metric] = this.metrics[args.metric] || [];
    const result = r.filter(metric => {
      return true;
    }).reduce((result, metric) => {

      const minute = result[Math.floor(metric.date / MINUTE)] || {
        sum : 0,
        min : metric.value,
        max : metric.value,
        count : 0
      };
      minute.sum += metric.value;
      ++minute.count;

      result[Metrics.getIndex(metric.date)] = minute;

      return result;

    }, {});
    if(data[args.metric]) {
      Object.keys(result).forEach(key => {
        result[key].average = result[key].sum / result[key].count;
        delete result[key].count;
      });
    } else {
      Object.keys(result).forEach(key => {
        delete result[key].max;
        delete result[key].min;
        delete result[key].count;
      });
    }
    return result;
  }
}

module.exports = Metrics;
