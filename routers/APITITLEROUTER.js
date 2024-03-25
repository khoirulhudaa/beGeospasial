const express = require('express')
const router = express.Router()
const titleController = require('../controllers/titleController')

router.get('/', titleController.getAllTitle)

module.exports = router