const express = require("express");
const app = express();
const Metrics = require("./private/metrics");
var bodyParser = require('body-parser')

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

const metrics = new Metrics();

let status = "live"; // or dead
app.post("/status/:status", (req, res) => {
  status = req.params.status;
  res.send({ data : status });
});

const die = res => {
  if(status !== "live") {
    res.send({ error : "service not available" })
    return true;
  }
};

app.post("/metric", (req, res) => {
  if(die(res)) return;
  res.send({
    data : metrics.postMany(req.body)
  });
});

app.get("/metric", (req, res) => {
  if(die(res)) return;
  res.send({
    data : metrics.get(req.body)
  });
});

app.listen(80, () => {
  console.log("ready");
});
