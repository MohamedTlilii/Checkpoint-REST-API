const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
app.use(express.json());
// environmentals varibales
const DBUSER = process.env.DBUSER;
const DBPWD = process.env.DBPWD;

// function
mongoose
  .connect(
    `mongodb+srv://${DBUSER}:${DBPWD}@mycluster.t5ajheo.mongodb.net/chekpointapi?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("database connected ✅");
  })
  .catch((err) => {
    console.log(err);
    console.log("can't coonect to database ❌");
  });

// routes

// Post
app.post("/addUser", async (req, res) => {
  try {
    let { name, age, favoriteFoods } = req.body;
    const newUser = await new User({
      name,
      age,
      favoriteFoods,
    });
    await newUser.save();
    res.status(200).json({ status: true, message: "Data was added" });
  } catch (error) {
    if (error.errors["name"]) {
      res.status(401).json({ status: false, error: error.errors.name.message });
    }
  }
});

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("Server is up and running on port 5000");
});
