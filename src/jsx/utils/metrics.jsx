class Metrics {
  constructor(fulfiller) {
    this.fulfiller = fulfiller;
    this.metrics = [];
    this.locked = [];
  }

  post(metric) {

    const self = this;

    self.metrics.push({
      ...metric,
      date : new Date().getTime()
    });

    const promise = new Promise(resolve => {
      if(!self.locked.length) { //if it is not locked
        resolve(); //just resolve it
      }
      self.locked.push(resolve); //lock it
    }).then(() => self.fulfiller("post", self.metrics)).then(data => {
      self.locked.shift(); //unlock
      self.locked[0] && self.locked[0](); //or process next
      if(data.error) {
        return Promise.reject(data.error);
      }
      self.metrics = self.metrics.slice(data.data.length);
      return data.data;
    }, error => {
      self.locked.shift(); //unlock
      self.locked[0] && self.locked[0](); //or process next
      return Promise.reject(error);
    });

    return promise;
  }

  get(data) {
    return this.fulfiller("get", data).then(data => {
      if(data.error) {
        return Promise.reject(data.error);
      }
      return data.data;
    });
  }
}

export default Metrics;
