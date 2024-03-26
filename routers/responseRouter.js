const express = require('express')
const router = express.Router()
const responseController = require('../controllers/responseController')

router.post('/', responseController.createResponse)
router.get('/', responseController.getAllResponse)
router.post('/:response_id', responseController.removeResponse)

module.exports = router