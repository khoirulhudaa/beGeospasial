const express = require('express')
const router = express.Router()
const dinasController = require('../controllers/dinasController')

router.get('/', dinasController.getAllDinas)

module.exports = router