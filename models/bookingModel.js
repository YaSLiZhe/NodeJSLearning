const mongoose = require('mongoose');

// Define the booking schema
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Name of the User model
    required: true,
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour', // Name of the Tour model
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paid: { type: Boolean, default: true },
});

// Define the pre-middleware to populate user and tour info
bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({ path: 'tour', select: 'name' });
  next();
});

// Create the Booking model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
