const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

// link to mongodb database, which you will get grom your mongodb account
// you will manually add into the link your un, pw and dbname
const dbUrl = `mongodb+srv://paradox69:0000@node-expressjs-test-pro.pakm8i7.mongodb.net/03-task-manager?retryWrites=true&w=majority`;
// handles nonexistent routes
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 3000;

const start = async () => {
  try {
    await connectDB(dbUrl);
    app.listen(port, console.log(`listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
