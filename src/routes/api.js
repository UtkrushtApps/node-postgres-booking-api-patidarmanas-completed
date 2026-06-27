const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

// Providers
router.get('/providers', controller.getProviders);
router.get('/providers/:id', controller.getProviderById);
router.get('/providers/:id/slots', controller.getProviderSlots);

// Bookings
router.get('/bookings', controller.listBookings);
router.get('/bookings/:id', controller.getBookingById);
router.post('/bookings', controller.createBooking);

module.exports = router;
