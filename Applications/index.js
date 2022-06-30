const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const passport = require("passport");
require("../Utils/passport.util")(passport);

const Auth = require('./Authentication/auth.router')
const Address = require("./Address/address.router")

/** Cors */
app.use(cors());

/** Body Parse */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Routers */
app.use("/test", (req, res, next) => {
  res.send(`<h1>Connected to server</h1>`);
});

app.use("/api/auth", Auth)
app.use("/api/address", Address)

module.exports = app;