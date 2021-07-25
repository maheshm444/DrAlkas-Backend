module.exports = app => {
  const user = require("../controllers/user.js")

  var router = require("express").Router();

  // Create new user
  router.post("/create", user.createUser);

  //  Get login details
  router.post("/login", user.login);

  app.use("/", router);
};
