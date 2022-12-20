const express = require("express");
const app = express();
const morgan = require("morgan");
//calling middleware functions
const logger = require("./logger");
const authorize = require("./authorize");
app.use([logger, authorize]);
app.use(morgan("tiny"));

// passing middleware in express app
// manual way of passing middleware
// app.get("/", logger, (req, res) => {
//   res.send("home");
// });

// app.get("/about", logger, (req, res) => {
//   res.send("about");
// });
// automatic way
app.get("/", (req, res) => {
  res.send("home");
});

app.get("/about", (req, res) => {
  res.send("about");
});
app.get("/api/products", (req, res) => {
  res.send("products");
});

app.get("/api/items", (req, res) => {
  console.log(req.user);
  res.send("items");
});

app.listen(5000, () => console.log("listening on port 5000..."));
