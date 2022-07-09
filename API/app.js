var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");
require("./database/config")

var userRouter = require("./routers/user");
var serviceRouter = require("./routers/service");
var authRouter = require("./routers/auth");
var passport = require("passport");
require("./auth/auth");
var app = express();

app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(authRouter);


app.use("/users", userRouter);
app.use("/services", serviceRouter);
module.exports = app;