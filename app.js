const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb://localhost:27017/node-auth";
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(3000, () => {
      console.log("Database connected to the server.");
    });
  })
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);

// Cookies
app.get("/set-cookies", (req, res) => {
  // res.setHeader('Set-Cookies', 'newUser=true');
  res.cookie("newUser", false);
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send("You got the cookies");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});
