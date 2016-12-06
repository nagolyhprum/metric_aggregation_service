const express = require("express");
const app = express();
const Metrics = require("./private/metrics");

app.use(express.static(__dirname + "/public"));

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
  if(die()) return;
  res.send({
    data : metrics.postMany(req.body)
  });
});

app.get("/metric", (req, res) => {
  if(die()) return;
  res.send({
    data : metrics.get(req.body)
  });
});

app.listen(80, () => {
  console.log("ready");
});
