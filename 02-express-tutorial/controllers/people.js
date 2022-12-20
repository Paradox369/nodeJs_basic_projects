// handling requests and responses here to be exported to the express server
// code looks clean like this!

let { people } = require("../data");

const getPeople = (req, res) => {
  res.send({ reqSuccess: true, data: people });
};

const postPerson = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ reqStatus: false, note: "enter name" });
  }

  res.status(201).send({ reqStatus: true, person: name });
};

const postPostman = (req, res) => {
  const { name } = req.body;

  if (!name)
    return res
      .status(404)
      .json({ reqStatus: false, note: "enter value, come on!" });

  res.status(200).send({ ...people, name });
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
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
};

module.exports = {
  getPeople,
  postPerson,
  postPostman,
  updatePerson,
  deletePerson,
};
