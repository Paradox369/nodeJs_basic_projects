const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer"))
    throw new UnauthenticatedError("invalid authentication");

  const token = authHeader.split(" ")[1];

  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findById(payLoad.id).select("-password");
    req.user = user;

    req.user = { userId: payLoad.userId, name: payLoad.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("invalid authentication");
  }
};

module.exports = auth;
