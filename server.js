const express = require("express");
const path    = require("path");
const routes  = require("./routes/index");
const morgan  = require("morgan");
const bodyParser = require("body-parser");
const flash   = require('express-flash-messages');
const model   = require("./models/index");
const cookieParser = require('cookie-parser');
const app     = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(morgan("dev"));

app.use(cookieParser())

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
})

app.use(routes);

app.listen(3000, function() {
  console.log("App is running on localhost:3000");
});
