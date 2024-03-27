const express = require('express')
const router = express.Router()
const polygonController = require('../controllers/polygonController')

router.post('/excel/:title_id', polygonController.createCustomPolygonExcel)
router.post('/update/excel', polygonController.updateCustomPolygonExcel)
router.post('/update/', polygonController.updateCustomPolygon)
router.post('/remove/excel', polygonController.removePolygonExcel)

module.exports = router