const mongoose = require("mongoose");

const roomsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  facilities: {
    type: [String], // Array of strings
    default: [],
  },
  picture: {
    type: String,
    default: null, // or use `required: true` if it's mandatory
  },
});

// Create the model
const Rooms = mongoose.model("Rooms", roomsSchema);

module.exports = Rooms;
