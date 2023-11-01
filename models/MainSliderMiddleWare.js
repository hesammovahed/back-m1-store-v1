const mongoose = require('mongoose')
const MainSliderMiddleWare = new mongoose.Schema({
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
    createdAt: {
        type: String,
        default: new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    },
    Link: {
        require: true,
        type: String,
    },
})
module.exports = mongoose.model('MainSliderMiddleWare', MainSliderMiddleWare)