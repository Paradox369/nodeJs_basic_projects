const express = require("express");
const app = express();
let { people } = require("./data");

// HTTP METHODS
// GET method
app.get("/api/people", (req, res) => {
  res.send({ reqSuccess: true, data: people });
});

// POST method
// including a static asset
app.use(express.static("./methods-public/"));
// parsing form data for the POST request
app.use(express.urlencoded({ extended: false }));
// parsing JSON for server response
app.use(express.json());

// simple POST method
app.post("/login", (req, res) => {
  const { name } = req.body;

  if (name) {
    res.status(200).send(`welcome ${name}`);
  }
  res.status(404).send("enter credentials yo!");
});
// advanced POST method
app.post("/api/people", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ reqStatus: false, note: "enter name" });
  }

  res.status(201).send({ reqStatus: true, person: name });
});
// try on postman
app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;

  if (!name)
    return res
      .status(404)
      .json({ reqStatus: false, note: "enter value, come on!" });

  res.status(200).send({ ...people, name });
});

// PUT method
app.put("/api/people/:person_id", (req, res) => {
  const { person_id } = req.params;
  const { name } = req.body;

  // console.log(person_id, name);
  const searchedPerson = people.find(
    (person) => person.id === Number(person_id)
  );

  if (!searchedPerson) {
    return res.status(404).json({
      reqSuccess: false,
      info: `person with id no.${person_id} doesn't exist, come on!`,
    });
  }
  const updatedPeople = people.map((person) => {
    if (person.id === Number(person_id)) {
      person.name = name;
    }
    return person;
  });
});

// DELETE method
app.delete("/api/people/:person_id", (req, res) => {
  const searchedPerson = people.find(
    (person) => person.id === Number(req.params.person_id)
  );

  if (!searchedPerson)
    return res.status(404).json({
      reqSuccess: false,
      data: `person with id no.${req.params.person_id} doesn't exist, come on!`,
    });

  const updatedPeople = people.filter(
    (person) => person.id !== Number(req.params.person_id)
  );

  res.status(200).json({ reqSuccess: true, data: updatedPeople });
});

app.listen(5000, () => console.log("listening on port 5000..."));
