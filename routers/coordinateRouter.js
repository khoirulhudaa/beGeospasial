const express = require('express')
const router = express.Router()
const coordinateController = require('../controllers/coordinateController')

router.post('/', coordinateController.createCoordinate)
router.post('/excel', coordinateController.createCoordinateExcel)
router.post('/custom', coordinateController.createCustomCoordinate)
router.get('/custom/:title_id', coordinateController.getAllCustomByTitle)
router.post('/delete/custom/:coordinate_id', coordinateController.removeCoordinateCustom)
router.post('/update', coordinateController.updateCoordinate)
router.post('/check', coordinateController.checkCoordinate)
router.post('/remove', coordinateController.removeCoordinate)

module.exports = router