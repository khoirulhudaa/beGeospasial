const mongoose = require('mongoose')

const titleModel = new mongoose.Schema({
    title_id: {
        type: String,
        required: true
    },
    dinas_id: {
        type: String,
        required: true
    },
    name_dinas: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    // name_location, kecataman, lat, long, link google map, catatan, condition
    coordinate: {
        type: Array,
        default: []
    },
    created_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('title', titleModel)
