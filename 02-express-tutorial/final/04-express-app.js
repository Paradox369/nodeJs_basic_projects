const express = require("express");
const path = require("path");

const app = express();

// setup static and middleware
// since index.html is within the
app.use(express.static("./public"));

// manual commands to include each file within the folder to the response
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
// });

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(5000, () => console.log("listening on port 5000..."));
