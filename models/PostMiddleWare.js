const mongoose = require('mongoose')
const PostMiddleWare = new mongoose.Schema({
    title: {
        require: true,
        type: String,
    },
    createdAt: {
        type: String,
        default: new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    },
    updatedAt: {
        type: String,
        default: new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    },
    slug: {
        require: true,
        type: String,
        unique: true,
    },
    image: {
        require: true,
        type: String,
    },
    imageAlt: {
        require: true,
        type: String,
    },
    shortDesc: {
        require: true,
        type: String,
    },
    longDesc: {
        require: true,
        type: String,
    },
    tags: {
        require: true,
        type: Array,
        default: [],
    },
    relatedPosts: {
        require: true,
        type: Array,
        default: [],
    },
    comments: {
        require: true,
        type: Array,
        default: [],
    },
    type: {
        require: true,
        type: String,
    },
    pageView:
        {
            require: true,
            type: Number,
            default: 0,
        },
    published: {
        require: true,
        type: Boolean,
    },


})
module.exports = mongoose.model('PostMiddleWare', PostMiddleWare)