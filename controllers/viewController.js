const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build the template

  // 3) Render that template using tour data from 1
  res.status(200).render('overview', { tour: 'All Tours', tours });
});
exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection

  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }
  // 2) Build the template

  // 3) Render that template using tour data from 1
  res.status(200).render('tour', { title: `${tour.name}`, tour });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into Your Account',
  });
};
exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create Your Account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find All bookings
  const bookings = await Booking.find({ user: req.user.id });
  // find tour ids by bookings
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', { title: 'My Tours', tours });
});
