const express = require("express");
const router = express.Router();

// the methods that are to be passed in router.route.get(__passed here)
const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = router;
