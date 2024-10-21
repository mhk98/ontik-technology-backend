const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({
    userID: {
    type: String,
    required: true,
  },
  roomID: {
    type: Number,
    required: true,
  },

  dates: {
    type: String,
    required: true,
  },
});

// Create the model
const Bookings = mongoose.model("Bookings", bookingsSchema);

module.exports = Bookings;
  