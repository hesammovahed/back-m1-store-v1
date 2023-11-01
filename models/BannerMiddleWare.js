const mongoose = require('mongoose')
const MiddlewareBanner = new mongoose.Schema({
    image: {
        require: true,
        type: String,
    },
    imageAlt: {
        require: true,
        type: String,
    },
    imageOnAndOff: {
        require: true,
        type: String,
    },
    link: {
        require: true,
        type: String,
    },
    date: {
        type: String,
        default: new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    },
})
module.exports = mongoose.model('MiddlewareBanner', MiddlewareBanner)