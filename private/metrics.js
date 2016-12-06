class Metrics {
  constructor() {
    this.metrics = {};
  }
  post(metric) {
    return false;
  }
  get(start, end) {
    return [];
  }
}

module.exports = Metrics;
