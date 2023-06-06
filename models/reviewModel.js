const mongoose = require('mongoose');
// review/ / rating/ createdAt/ ref to user/ ref to tour

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'You must have a rating!'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'A review must belong to a Tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to a User'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    //populate to get associated data
    path: 'tour',
    select: 'name -_id',
  }).populate({
    //populate to get associated data
    path: 'user',
    select: 'name',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
