const express = require("express");
const app = express();
const Metrics = require("./private/metrics");

app.use(express.static(__dirname + "/public"));

const metrics = new Metrics();

app.post("/metric", (req, res) => {
  res.send(metrics.postMany(req.body));
});

app.get("/metric", (req, res) => {
  res.send({
    data : metrics.get(req.body)
  });
});

app.listen(80, () => {
  console.log("ready");
});
