const express = require('express')
const router = express.Router()
const subdistrictController = require('../controllers/SubdistrictController')

router.post('/', subdistrictController.createSubdistrict)
router.get('/', subdistrictController.getAllSubdistrict)
router.post('/update', subdistrictController.updateSubdistrict)
router.post('/:subdistrict_id', subdistrictController.removeSubdistrict)

module.exports = router