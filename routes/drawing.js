const express = require('express')
const DrawingController = require('../controllers/drawing.controller')
const router = express.Router();

router.get('/', DrawingController.getAllDrawing);
router.get('/:id', DrawingController.getSingleDrawing);
router.post('/create', DrawingController.createDrawing);
router.patch('/:id', DrawingController.updateDrawing);
router.delete('/:id', DrawingController.deleteDrawing);


module.exports = router