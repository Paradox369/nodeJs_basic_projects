const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    throw new BadRequestError("please provide email and password");

  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashBoard = async (req, res) => {
  const luckNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `hello, ${req.user.username}!`,
    secret: `Here is your authorized data, your lucky number is ${luckNumber}`,
  });
};

module.exports = {
  login,
  dashBoard,
};
