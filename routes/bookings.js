const express = require('express')
const BookingsController = require('../controllers/bookings.controller')
const router = express.Router();

router.get('/', BookingsController.getAllBookings);
router.get('/:id', BookingsController.getSingleBookings);
router.post('/create', BookingsController.createBookings);
router.patch('/:id', BookingsController.updateBookings);
router.delete('/:id', BookingsController.deleteBookings);


module.exports = router