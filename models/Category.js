const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const CategorySchema = new Schema({
    title: {
        require: true,
        type: String,
    },
    slug: {
        require: true,
        type: String,
        unique:true
    },
    image: {
        require: true,
        type: String,
    },
    imageAlt: {
        require: true,
        type: String,
    },
    published: {
        require: true,
        type: Boolean,
    },
})

module.exports = mongoose.model('Category', CategorySchema)