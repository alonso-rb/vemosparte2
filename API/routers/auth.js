var { createUser } = require("../controllers/user");
var express = require("express");
var jwt = require("jsonwebtoken");
var UserModel = require("../model/user.model");
var ServiceModel = require("../model/services.model");
const { createServices } = require("../controllers/service");
var router = express.Router();

router.post("/register", createUser);
router.post("/login", async (req, res, next) => {
  try {
    let { name, password, phone, email } = req.body; //TODO: Add email 
    let user = await UserModel.findOne({ name });
    if (!user)
      return res.status(400).send({
        message: "User not found",
      });
    let validPassword = await user.isValidPassword(password);
    if (!validPassword)
      return res.status(400).send({
        message: "Wrong password",
      });
    let body = { _id: user._id, email: user.email };
    let token = jwt.sign(
      { user: body },
      process.env.JWT_SECRET || "TOP_SECRET"
    );
    return res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;