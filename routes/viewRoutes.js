const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const BookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  BookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);

//login

module.exports = router;
