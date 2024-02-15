const mongoose = require('mongoose')

const dinasModel = new mongoose.Schema({
    dinas_id: {
        type: String,
        required: true
    },
    name_dinas: {
        type: String,
        required: true
    },
    abbreviation: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('dinas', dinasModel)
