// const express = require("express");
// USING EXPRESS ROUTERS
// initiating the router
// const router = express.Router();

// let { people } = require("../data");

// // setting up routes
// router.get("/", (req, res) => {
//   res.send({ reqSuccess: true, data: people });
// });

// router.post("/", (req, res) => {
//   const { name } = req.body;

//   if (!name) {
//     return res.status(400).json({ reqStatus: false, note: "enter name" });
//   }

//   res.status(201).send({ reqStatus: true, person: name });
// });

// router.post("/postman", (req, res) => {
//   const { name } = req.body;

//   if (!name)
//     return res
//       .status(404)
//       .json({ reqStatus: false, note: "enter value, come on!" });

//   res.status(200).send({ ...people, name });
// });

// router.put("/:person_id", (req, res) => {
//   const { person_id } = req.params;
//   const { name } = req.body;

//   // console.log(person_id, name);
//   const searchedPerson = people.find(
//     (person) => person.id === Number(person_id)
//   );

//   if (!searchedPerson) {
//     return res.status(404).json({
//       reqSuccess: false,
//       info: `person with id no.${person_id} doesn't exist, come on!`,
//     });
//   }
//   const updatedPeople = people.map((person) => {
//     if (person.id === Number(person_id)) {
//       person.name = name;
//     }
//     return person;
//   });
// });

// router.delete("/:person_id", (req, res) => {
//   const searchedPerson = people.find(
//     (person) => person.id === Number(req.params.person_id)
//   );

//   if (!searchedPerson)
//     return res.status(404).json({
//       reqSuccess: false,
//       data: `person with id no.${req.params.person_id} doesn't exist, come on!`,
//     });

//   const updatedPeople = people.filter(
//     (person) => person.id !== Number(req.params.person_id)
//   );

//   res.status(200).json({ reqSuccess: true, data: updatedPeople });
// });

// USING EXPRESS CONTROLLERS
const express = require("express");
// initiating the router
const router = express.Router();
const routerController = require("../controllers/people");

router.get("/", routerController.getPeople);
router.post("/", routerController.postPerson);
router.post("/postman", routerController.postPostman);
router.put("/:person_id", routerController.updatePerson);
router.delete("/:person_id", routerController.deletePerson);

// another way of setting router
// router.route("/").get(routerController.getPeople).post(routerController.postPerson)
// router.route("/postman").post(routerController.postPostman)
// router.route("/:person_id").put(routerController.updatePerson).delete(routerController.deletePerson)

module.exports = router;
