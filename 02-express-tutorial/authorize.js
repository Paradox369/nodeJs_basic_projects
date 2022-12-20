const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "john") {
    req.user = { name: "john", id: 3 };
    next();
  } else res.status(401).send("unauthorised user");
  // in the search bar, concatenate /?user=john
};

module.exports = authorize;
