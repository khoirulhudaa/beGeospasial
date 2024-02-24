const express = require('express')
const router = express.Router()
const coordinateController = require('../controllers/coordinateController')

router.post('/', coordinateController.createCoordinate)
router.post('/custom', coordinateController.createCustomCoordinate)
router.post('/update', coordinateController.updateCoordinate)
router.post('/check', coordinateController.checkCoordinate)
router.post('/remove', coordinateController.removeCoordinate)

module.exports = router