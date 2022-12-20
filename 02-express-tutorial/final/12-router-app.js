// calling and initiating an express object
const express = require("express");
const app = express();
// calling the router files
const routedPeople = require("./routes/people");
const routerAuth = require("./routes/authentication");

// calling the website to be used
app.use(express.static("./methods-public/"));
// parsing GET requests from above website by user
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// employing express routers
app.use("/login", routerAuth);
app.use("/api/people", routedPeople);

app.listen(5000, () => console.log("listening on port 5000..."));
