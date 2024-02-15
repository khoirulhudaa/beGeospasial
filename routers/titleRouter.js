const express = require('express')
const router = express.Router()
const titleController = require('../controllers/titleController')

router.post('/', titleController.createTitle)
router.get('/', titleController.getAllTitle)
router.post('/update', titleController.updateTitle)
router.post('/:title_id', titleController.removeTitle)

module.exports = router