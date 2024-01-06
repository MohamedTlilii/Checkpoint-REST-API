// Import necessary modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

// Middleware to parse JSON in the request body
app.use(express.json());

// Environmental variables
const DBUSER = process.env.DBUSER;
const DBPWD = process.env.DBPWD;

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${DBUSER}:${DBPWD}@mycluster.t5ajheo.mongodb.net/chekpointapi?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connected ✅");
  })
  .catch((err) => {
    console.error(err);
    console.error("Unable to connect to the database ❌");
  });

// Routes

//  POST :  Add a new user
app.post("/addUser", async (req, res) => {
  try {
    const { name, age, favoriteFoods } = req.body;
    const newUser = await new User({
      name,
      age,
      favoriteFoods,
    });
    await newUser.save();
    res.status(200).json({ status: true, message: "User added successfully" });
  } catch (error) {
    if (error) {
      console.error(errors);
    }
    if (error.errors["name"]) {
      res.status(401).json({ status: false, error: error.errors.name.message });
    }
  }
});

// GET :  Get all users
app.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({ status: true, data });
  } catch (error) {
    if (error) throw error;
  }
});

//PUT : Edit a user by ID
app.put("/editUser", async (req, res) => {
  try {
    let { _id } = req.query;
    let data = await User.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
    if (error) throw error;
  }
});

//DELETE : Delete a user by ID
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await Person.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "User was removed" });
  } catch (error) {
    if (error) throw error;
  }
});
// Start the server
app.listen(5000, (err) => {
  if (err) throw err;
  console.log("server is up and running on  port 5000");
});
