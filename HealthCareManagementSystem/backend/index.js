const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

// 'mongodb://127.0.0.1:27017/jira',
try {
  mongoose.connect('mongodb://127.0.0.1:27017/healthcare',
      {
          useUnifiedTopology: true,
          useNewUrlParser: true
      }
  )
} catch (error) {
  console.log("Database connectivity error : ", error)
}



app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen("5000", () => {
  console.log("Server is running!");
});
