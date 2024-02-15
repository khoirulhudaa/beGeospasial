const mongoose = require('mongoose')

const subdistrictModel = new mongoose.Schema({
    subdistrict_id: {
        type: String,
        required: true
    },
    name_subdistrict: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('subdistrict', subdistrictModel)
