const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", (err) => {
    if (err) {
      console.log("Unable to append to server.log");
    }
  });
  next();
});

// app.use((req, res, next) => {
//  res.render("maintenance");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});


app.get("/", (req, res) => {
  // res.send("<h1>Hello, this is the root page from the express server!</h1>");
  res.render("home", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to our website!"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About Page",
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to fulfill this request"
  });
});



app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});