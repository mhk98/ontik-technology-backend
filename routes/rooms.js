const express = require('express')
const RoomsController = require('../controllers/rooms.controller')
const router = express.Router();

router.get('/', RoomsController.getAllRooms);
router.get('/:id', RoomsController.getSingleRooms);
router.post('/create', RoomsController.createRooms);
router.patch('/:id', RoomsController.updateRooms);
router.delete('/:id', RoomsController.deleteRooms);


module.exports = router