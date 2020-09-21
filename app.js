const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const helmet = require('helmet');

const flash = require("connect-flash");


const mongoose = require("mongoose");
require("dotenv").config();
const Person = require("./Schema").Person;

const app = express();
console.clear();

// setup session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(flash());

// setup template engine
app.set("views", "./views");
app.set("view engine", "pug");

// serve static files
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

/*==================================================== 
    CONNECT TO DB
=====================================================*/
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create the home url
app.get("/", (req, res) => {
  res.render("index", {
    title: "QUAD CAPTCHA",
    error: req.flash("error"),
    success: req.flash("success"),
  });
});

app.route("/register").post((req, res) => {
  const { email, quad_captcha } = req.body;

  if (!email || !quad_captcha) {
    req.flash("error", "Please provide an email and solve the CAPTCHA!");
    res.redirect("/");
  } else {
    const isExist = Person.countDocuments({ email: email }, (err, count) => {
      if (count > 0) {
        req.flash("error", "this email is already in the list");
        res.status(401).redirect("/");
      } else {
        const newPerson = new Person({
          email: email,
        });

        newPerson.save((err, data) => {
          if (err) res.send(err);
          req.flash("success", `Success! ${data.email} added to waitlist`);
          res.redirect("/");
        });
      }
    });
  }
});

app.route("/thank").get((req, res) => {
  // const { check, email } = req.body;
  res.send(`Hello, it looks like you passed the cpatcha`);
});

app.listen(process.env.PORT || 8080, () => console.log("Listening on 3000"));
