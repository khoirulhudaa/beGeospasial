const express = require('express')
const router = express.Router()
const dinasController = require('../controllers/dinasController')

router.post('/', dinasController.createDinas)
router.get('/', dinasController.getAllDinas)
router.post('/update', dinasController.updateDinas)
router.post('/:dinas_id', dinasController.removeDinas)

module.exports = router