const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

app.post("/metric", (req, res) => {
  res.send("Not implemented yet.");
});

app.get("/metric", (req, res) => {
  res.send("Not implemented yet.");
});

app.listen(80, () => {
  console.log("ready");
});
