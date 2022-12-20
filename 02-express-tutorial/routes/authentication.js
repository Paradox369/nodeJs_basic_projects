const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { name } = req.body;

  if (name) {
    res.status(200).send(`welcome ${name}`);
  }
  res.status(404).send("enter credentials yo!");
});

module.exports = router;
