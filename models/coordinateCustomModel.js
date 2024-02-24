const mongoose = require('mongoose')

const coordinateModel = new mongoose.Schema({
    coordinate_id: {
        type: String,
        required: true
    },
    title_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    coordinates: {
        type: Array,
        required: true
    },
    wide: {
        type: Number,
        default: 0
    },
    typeWide: {
        type: String,
        default: '-'
    },
    type_area: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type_danger: {
        type: String,
        default: '-',
    },
    color: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('coordinate', coordinateModel)
