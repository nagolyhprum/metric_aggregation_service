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
  postMany(metrics) {
    return (metrics || []).map(item => this.post(item));
  }
  post(metric) {
    if(metric.date && (data[metric.metric] || named[metric.metric])) {
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
  /*
  from - inclusive
  to - exclusive
  */
  get(args) {
    const r = this.metrics[args.metric] = this.metrics[args.metric] || [];
    const result = r.filter(metric => {
      return (!args.from || args.from <= metric.date) && (!args.to || metric.date < args.to);
    }).reduce((result, metric) => {
      const minute = result[Math.floor(metric.date / MINUTE)] || {
        sum : 0,
        min : metric.value,
        max : metric.value,
        count : 0
      };
      if(metric.value > minute.max) {
        minute.max = metric.value;
      } else if(metric.value < minute.min) {
        minute.min = metric.value;
      }
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
