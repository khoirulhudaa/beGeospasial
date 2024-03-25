const express = require('express')
const router = express.Router()
const subdistrictController = require('../controllers/SubdistrictController')

router.get('/', subdistrictController.getAllSubdistrict)

module.exports = router