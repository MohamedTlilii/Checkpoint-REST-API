const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name field is required"],
    },
    age: {
      type: Number,
    },
    favoriteFoods: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Export the model correctly
module.exports = mongoose.model("Users", userSchema);
